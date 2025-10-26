import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { paymentPackages } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { userId, packageId, orderId, amount, currency, paymentMethod } = await request.json();

    if (!userId || !packageId) {
      return NextResponse.json({ error: 'User ID and Package ID are required' }, { status: 400 });
    }

    // Get package details
    const selectedPackage = paymentPackages[packageId as keyof typeof paymentPackages];
    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    console.log('Manual payment processing:', {
      userId,
      packageId,
      credits: selectedPackage.credits,
      orderId: orderId || 'manual_payment',
      amount: amount || selectedPackage.priceUSD,
      currency: currency || 'INR',
      paymentMethod: paymentMethod || 'manual'
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

    // Update user credits with plan type
    const { data: updatedCredits, error: updateError } = await supabase
      .from('user_credits')
      .upsert({
        user_id: userId,
        total_credits: newTotalCredits,
        used_credits: currentCredits?.used_credits || 0,
        remaining_credits: newRemainingCredits,
        plan_type: packageId, // This changes subscription from 'free' to 'starter' or 'pro'
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
        amount_paid: amount || selectedPackage.priceUSD,
        currency: currency || 'INR',
        order_id: orderId || `manual_${Date.now()}`,
        transaction_id: `manual_txn_${Date.now()}`,
        payment_method: paymentMethod || 'manual',
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
        type: 'purchase',
        amount: selectedPackage.credits,
        description: `Payment completed: ${selectedPackage.name} - ${selectedPackage.credits} credits`,
        created_at: new Date().toISOString()
      });

    if (transactionError) {
      console.error('Error creating credit transaction:', transactionError);
    }

    console.log(`Successfully processed payment: ${selectedPackage.credits} credits added to user ${userId}, plan changed to ${packageId}`);

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${selectedPackage.name} payment`,
      package: selectedPackage,
      creditsBefore: {
        total: currentCredits?.total_credits || 0,
        used: currentCredits?.used_credits || 0,
        remaining: currentCredits?.remaining_credits || 0,
        plan: currentCredits?.plan_type || 'free'
      },
      creditsAfter: {
        total: updatedCredits.total_credits,
        used: updatedCredits.used_credits,
        remaining: updatedCredits.remaining_credits,
        plan: updatedCredits.plan_type
      },
      creditsAdded: selectedPackage.credits,
      planChanged: currentCredits?.plan_type !== packageId
    });

  } catch (error) {
    console.error('Manual payment processing error:', error);
    return NextResponse.json({ 
      error: 'Failed to process payment',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
