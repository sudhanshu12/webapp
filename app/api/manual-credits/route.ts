import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { paymentPackages } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { userId, packageId, orderId, reason } = await request.json();

    if (!userId || !packageId) {
      return NextResponse.json({ error: 'User ID and Package ID are required' }, { status: 400 });
    }

    // Get package details
    const selectedPackage = paymentPackages[packageId as keyof typeof paymentPackages];
    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    console.log('Manual credit addition:', {
      userId,
      packageId,
      credits: selectedPackage.credits,
      reason: reason || 'Manual addition'
    });

    // Get current user credits
    const { data: currentCredits, error: fetchError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user credits:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch user credits' }, { status: 500 });
    }

    // Calculate new credits
    const newTotalCredits = (currentCredits?.total_credits || 0) + selectedPackage.credits;
    const newRemainingCredits = (currentCredits?.remaining_credits || 0) + selectedPackage.credits;

    // Update user credits
    const { data: updatedCredits, error: updateError } = await supabase
      .from('user_credits')
      .upsert({
        user_id: userId,
        total_credits: newTotalCredits,
        used_credits: currentCredits?.used_credits || 0,
        remaining_credits: newRemainingCredits,
        plan_type: packageId,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (updateError) {
      console.error('Error updating user credits:', updateError);
      return NextResponse.json({ error: 'Failed to update user credits' }, { status: 500 });
    }

    // Create purchase record
    const { error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        package_id: packageId,
        credits_purchased: selectedPackage.credits,
        amount_paid: selectedPackage.priceUSD,
        currency: 'INR',
        order_id: orderId || `manual_${Date.now()}`,
        transaction_id: `manual_txn_${Date.now()}`,
        payment_method: 'manual',
        status: 'completed',
        created_at: new Date().toISOString()
      });

    if (purchaseError) {
      console.error('Error creating purchase record:', purchaseError);
    }

    // Create credit transaction record
    const { error: transactionError } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: 'add',
        amount: selectedPackage.credits,
        description: reason || `Manual addition: ${selectedPackage.name} - ${selectedPackage.credits} credits`,
        created_at: new Date().toISOString()
      });

    if (transactionError) {
      console.error('Error creating credit transaction:', transactionError);
    }

    console.log(`Successfully added ${selectedPackage.credits} credits to user ${userId}`);

    return NextResponse.json({
      success: true,
      message: `Successfully added ${selectedPackage.credits} credits for ${selectedPackage.name}`,
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
      creditsAdded: selectedPackage.credits
    });

  } catch (error) {
    console.error('Manual credit addition error:', error);
    return NextResponse.json({ 
      error: 'Failed to add credits',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Get user credits
    const { data: credits, error: creditsError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (creditsError && creditsError.code !== 'PGRST116') {
      console.error('Error fetching user credits:', creditsError);
      return NextResponse.json({ error: 'Failed to fetch user credits' }, { status: 500 });
    }

    // Get recent purchases
    const { data: purchases, error: purchasesError } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (purchasesError) {
      console.error('Error fetching purchases:', purchasesError);
    }

    // Get recent credit transactions
    const { data: transactions, error: transactionsError } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (transactionsError) {
      console.error('Error fetching credit transactions:', transactionsError);
    }

    return NextResponse.json({
      success: true,
      userId,
      credits: credits || {
        total_credits: 0,
        used_credits: 0,
        remaining_credits: 0,
        plan_type: 'free'
      },
      recentPurchases: purchases || [],
      recentTransactions: transactions || []
    });

  } catch (error) {
    console.error('Get credits error:', error);
    return NextResponse.json({ 
      error: 'Failed to get credits',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
