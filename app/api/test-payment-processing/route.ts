import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { paymentPackages } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { userId, packageId, paymentMethod = 'test' } = await req.json();

    if (!userId || !packageId) {
      return NextResponse.json({ error: 'User ID and package ID are required' }, { status: 400 });
    }

    const selectedPackage = paymentPackages[packageId as keyof typeof paymentPackages];
    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    console.log('Testing automatic payment processing:', {
      userId,
      packageId,
      credits: selectedPackage.credits,
      paymentMethod
    });

    // Simulate webhook processing
    const orderId = `test_order_${Date.now()}`;
    const creditsToAdd = selectedPackage.credits;

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin client not initialized' }, { status: 500 });
    }

    // 1. Update user credits (simulate webhook)
    const { data: existingCredits, error: creditsError } = await supabaseAdmin
      .from('user_credits')
      .select('total_credits, used_credits, remaining_credits')
      .eq('user_id', userId)
      .single();

    let newTotalCredits = creditsToAdd;
    let newUsedCredits = 0;
    let newRemainingCredits = creditsToAdd;

    if (existingCredits) {
      newTotalCredits = existingCredits.total_credits + creditsToAdd;
      newUsedCredits = existingCredits.used_credits;
      newRemainingCredits = existingCredits.remaining_credits + creditsToAdd;
    }

    const { data: updatedCredits, error: updateCreditsError } = await supabaseAdmin
      .from('user_credits')
      .upsert({
        user_id: userId,
        total_credits: newTotalCredits,
        used_credits: newUsedCredits,
        remaining_credits: newRemainingCredits,
        plan_type: packageId, // Changes subscription from 'free' to 'starter'/'pro'
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (updateCreditsError) {
      console.error('Error updating user credits:', updateCreditsError);
      return NextResponse.json({ error: 'Failed to update user credits' }, { status: 500 });
    }

    // 2. Create purchase record
    const { error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .insert({
        user_id: userId,
        package_id: packageId,
        credits_purchased: creditsToAdd,
        amount_paid: selectedPackage.priceUSD,
        currency: 'USD',
        order_id: orderId,
        transaction_id: `test_txn_${Date.now()}`,
        payment_method: paymentMethod,
        status: 'completed',
        created_at: new Date().toISOString()
      });

    if (purchaseError) {
      console.error('Error creating purchase record:', purchaseError);
      return NextResponse.json({ error: 'Failed to create purchase record' }, { status: 500 });
    }

    console.log(`Test payment processed successfully: ${creditsToAdd} credits added to user ${userId}`);

    return NextResponse.json({
      success: true,
      message: `Test payment processed successfully. Added ${creditsToAdd} credits.`,
      credits: updatedCredits,
      purchaseRecord: {
        packageId,
        creditsAdded: creditsToAdd,
        orderId,
        paymentMethod
      }
    });

  } catch (error) {
    console.error('Test payment API error:', error);
    return NextResponse.json({ 
      error: 'Test payment processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
