import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { paymentPackages } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    console.log('PayPal webhook received:', body);

    // Parse PayPal IPN data
    const params = new URLSearchParams(body);
    const paymentStatus = params.get('payment_status');
    const txnId = params.get('txn_id');
    const custom = params.get('custom'); // This contains our order ID
    const mcGross = params.get('mc_gross');
    const mcCurrency = params.get('mc_currency');
    const payerEmail = params.get('payer_email');

    console.log('PayPal webhook data:', {
      paymentStatus,
      txnId,
      custom,
      mcGross,
      mcCurrency,
      payerEmail
    });

    // Verify this is a completed payment
    if (paymentStatus !== 'Completed') {
      console.log('Payment not completed, status:', paymentStatus);
      return NextResponse.json({ success: true, message: 'Payment not completed' });
    }

    if (!custom || !txnId) {
      console.error('Missing order ID or transaction ID');
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    // Extract package ID from order ID (format: paypal_order_timestamp_random_packageId)
    const orderIdParts = custom.split('_');
    const packageId = orderIdParts[orderIdParts.length - 1];
    
    if (!packageId || !paymentPackages[packageId as keyof typeof paymentPackages]) {
      console.error('Invalid package ID:', packageId);
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    const selectedPackage = paymentPackages[packageId as keyof typeof paymentPackages];
    
    // Find the user by checking pending purchases
    const { data: pendingPurchase, error: pendingError } = await supabase
      .from('pending_purchases')
      .select('user_id')
      .eq('order_id', custom)
      .eq('status', 'pending')
      .single();

    if (pendingError || !pendingPurchase) {
      console.error('Pending purchase not found for order:', custom);
      return NextResponse.json({ error: 'Pending purchase not found' }, { status: 404 });
    }

    const userId = pendingPurchase.user_id;

    // Add credits to user account
    const { data: userCredits, error: fetchError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    let newTotalCredits = selectedPackage.credits;
    let newUsedCredits = 0;
    let newRemainingCredits = selectedPackage.credits;

    if (userCredits) {
      // Existing user - add credits
      newTotalCredits = userCredits.total_credits + selectedPackage.credits;
      newUsedCredits = userCredits.used_credits;
      newRemainingCredits = userCredits.remaining_credits + selectedPackage.credits;
    }
    // If no userCredits found, use default values for new user

    const { error: updateError } = await supabase
      .from('user_credits')
      .upsert({
        user_id: userId,
        total_credits: newTotalCredits,
        used_credits: newUsedCredits,
        remaining_credits: newRemainingCredits,
        plan_type: packageId, // This changes subscription from 'free' to 'starter' or 'pro'
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (updateError) {
      console.error('Error updating user credits:', updateError);
      return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 });
    }

    // Create purchase record
    const { error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        package_id: packageId,
        credits_purchased: selectedPackage.credits,
        amount_paid: parseFloat(mcGross || '0'),
        currency: mcCurrency || 'USD',
        order_id: custom,
        transaction_id: txnId,
        payment_method: 'paypal',
        status: 'completed',
        created_at: new Date().toISOString()
      });

    if (purchaseError) {
      console.error('Error creating purchase record:', purchaseError);
    }

    // Update pending purchase status
    const { error: pendingUpdateError } = await supabase
      .from('pending_purchases')
      .update({ 
        status: 'completed',
        transaction_id: txnId,
        completed_at: new Date().toISOString()
      })
      .eq('order_id', custom)
      .eq('status', 'pending');

    if (pendingUpdateError) {
      console.error('Error updating pending purchase:', pendingUpdateError);
    }

    console.log(`Successfully processed PayPal payment: ${selectedPackage.credits} credits added to user ${userId}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Payment processed successfully',
      creditsAdded: selectedPackage.credits,
      userId: userId
    });

  } catch (error) {
    console.error('PayPal webhook processing error:', error);
    return NextResponse.json({ 
      error: 'Webhook processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Handle GET requests for PayPal IPN verification
export async function GET(req: NextRequest) {
  return NextResponse.json({ 
    message: 'PayPal webhook endpoint is active',
    method: 'Use POST for webhook processing'
  });
}
