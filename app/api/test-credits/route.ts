import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { paymentPackages } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const testPackage = searchParams.get('package') || 'starter';

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Get package details
    const selectedPackage = paymentPackages[testPackage as keyof typeof paymentPackages];
    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 });
    }

    // Check current user credits
    const { data: currentCredits, error: fetchError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user credits:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch user credits' }, { status: 500 });
    }

    // Simulate adding credits (for testing)
    const { data: updatedCredits, error: updateError } = await supabase
      .from('user_credits')
      .upsert({
        user_id: userId,
        total_credits: (currentCredits?.total_credits || 0) + selectedPackage.credits,
        used_credits: currentCredits?.used_credits || 0,
        remaining_credits: (currentCredits?.remaining_credits || 0) + selectedPackage.credits,
        plan_type: testPackage,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (updateError) {
      console.error('Error updating user credits:', updateError);
      return NextResponse.json({ error: 'Failed to update user credits' }, { status: 500 });
    }

    // Create a test purchase record
    const { data: purchaseRecord, error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        package_id: testPackage,
        credits_purchased: selectedPackage.credits,
        amount_paid: selectedPackage.priceUSD,
        currency: 'USD',
        order_id: `test_order_${Date.now()}`,
        transaction_id: `test_txn_${Date.now()}`,
        payment_method: 'test',
        status: 'completed',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (purchaseError) {
      console.error('Error creating purchase record:', purchaseError);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully added ${selectedPackage.credits} credits for ${testPackage} package`,
      package: selectedPackage,
      creditsBefore: {
        total: currentCredits?.total_credits || 0,
        used: currentCredits?.used_credits || 0,
        remaining: currentCredits?.remaining_credits || 0
      },
      creditsAfter: {
        total: updatedCredits.total_credits,
        used: updatedCredits.used_credits,
        remaining: updatedCredits.remaining_credits
      },
      creditsAdded: selectedPackage.credits,
      purchaseRecord: purchaseRecord || null
    });

  } catch (error) {
    console.error('Test credit system error:', error);
    return NextResponse.json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, packageId, credits, description } = await request.json();

    if (!userId || !credits) {
      return NextResponse.json({ error: 'User ID and credits are required' }, { status: 400 });
    }

    // Get current credits
    const { data: currentCredits, error: fetchError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user credits:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch user credits' }, { status: 500 });
    }

    // Update credits
    const newTotalCredits = (currentCredits?.total_credits || 0) + credits;
    const newRemainingCredits = (currentCredits?.remaining_credits || 0) + credits;

    const { data: updatedCredits, error: updateError } = await supabase
      .from('user_credits')
      .upsert({
        user_id: userId,
        total_credits: newTotalCredits,
        used_credits: currentCredits?.used_credits || 0,
        remaining_credits: newRemainingCredits,
        plan_type: packageId || 'free',
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (updateError) {
      console.error('Error updating user credits:', updateError);
      return NextResponse.json({ error: 'Failed to update user credits' }, { status: 500 });
    }

    // Create credit transaction record
    const { error: transactionError } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: 'add',
        amount: credits,
        description: description || `Added ${credits} credits`,
        created_at: new Date().toISOString()
      });

    if (transactionError) {
      console.error('Error creating credit transaction:', transactionError);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully added ${credits} credits`,
      creditsBefore: {
        total: currentCredits?.total_credits || 0,
        used: currentCredits?.used_credits || 0,
        remaining: currentCredits?.remaining_credits || 0
      },
      creditsAfter: {
        total: updatedCredits.total_credits,
        used: updatedCredits.used_credits,
        remaining: updatedCredits.remaining_credits
      },
      creditsAdded: credits
    });

  } catch (error) {
    console.error('Add credits error:', error);
    return NextResponse.json({ 
      error: 'Failed to add credits',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
