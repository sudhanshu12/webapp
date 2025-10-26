import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-webhook-signature');

    // Verify webhook signature (optional but recommended for security)
    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.CASHFREE_WEBHOOK_SECRET || 'your-webhook-secret')
        .update(body)
        .digest('hex');
      
      if (signature !== expectedSignature) {
        console.error('Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const webhookData = JSON.parse(body);
    console.log('Cashfree webhook received:', webhookData);

    const { orderId, orderStatus, paymentStatus, paymentTime } = webhookData;

    if (!orderId) {
      return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
    }

    // Update order status in database
    const { error: updateError } = await supabase
      .from('payment_orders')
      .update({
        status: orderStatus,
        payment_status: paymentStatus,
        payment_time: paymentTime,
        updated_at: new Date().toISOString()
      })
      .eq('cashfree_order_id', orderId);

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }

    // If payment is successful, update user credits
    if (paymentStatus === 'SUCCESS' && orderStatus === 'PAID') {
      // Get order details
      const { data: orderData, error: orderError } = await supabase
        .from('payment_orders')
        .select('user_id, package_id, amount')
        .eq('cashfree_order_id', orderId)
        .single();

      if (orderError || !orderData) {
        console.error('Error fetching order data:', orderError);
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      // Get package details
      const packageCredits = orderData.package_id === 'starter' ? 5 : 30;

      // Update user credits
      const { data: existingCredits, error: creditsError } = await supabase
        .from('user_credits')
        .select('total_credits, used_credits, remaining_credits')
        .eq('user_id', orderData.user_id)
        .single();

      let newTotalCredits = packageCredits;
      let newUsedCredits = 0;
      let newRemainingCredits = packageCredits;

      if (existingCredits) {
        newTotalCredits = existingCredits.total_credits + packageCredits;
        newUsedCredits = existingCredits.used_credits;
        newRemainingCredits = existingCredits.remaining_credits + packageCredits;
      }
      // If no existingCredits found, use default values for new user

      // Update or create user credits with proper plan type
      const { error: updateCreditsError } = await supabase
        .from('user_credits')
        .upsert({
          user_id: orderData.user_id,
          total_credits: newTotalCredits,
          used_credits: newUsedCredits,
          remaining_credits: newRemainingCredits,
          plan_type: orderData.package_id, // This changes subscription from 'free' to 'starter' or 'pro'
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (updateCreditsError) {
        console.error('Error updating user credits:', updateCreditsError);
        return NextResponse.json({ error: 'Failed to update user credits' }, { status: 500 });
      }

      // Create purchase record
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert({
          user_id: orderData.user_id,
          package_id: orderData.package_id,
          credits_purchased: packageCredits,
          amount_paid: orderData.amount,
          currency: 'INR',
          order_id: orderId,
          transaction_id: orderId,
          payment_method: 'cashfree',
          status: 'completed',
          created_at: new Date().toISOString()
        });

      if (purchaseError) {
        console.error('Error creating purchase record:', purchaseError);
      }

      console.log(`Successfully updated credits for user ${orderData.user_id}. Added ${packageCredits} credits.`);
    }

    return NextResponse.json({ message: 'Webhook processed successfully' });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
