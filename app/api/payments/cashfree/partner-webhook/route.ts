import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cashfreeConfig } from '@/lib/cashfree';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-webhook-signature');
    const timestamp = req.headers.get('x-webhook-timestamp');

    if (!signature || !timestamp) {
      console.error('Missing webhook signature or timestamp');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify webhook signature as per Cashfree documentation
    const expectedSignature = crypto
      .createHmac('sha256', cashfreeConfig.partnerApiKey)
      .update(`${timestamp}.${body}`)
      .digest('base64');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const webhookData = JSON.parse(body);
    console.log('Partner webhook received:', webhookData);

    // Handle different webhook events
    switch (webhookData.type) {
      case 'PAYMENT_SUCCESS':
        await handlePaymentSuccess(webhookData);
        break;
      case 'PAYMENT_FAILED':
        await handlePaymentFailed(webhookData);
        break;
      case 'PAYMENT_USER_DROPPED':
        await handlePaymentDropped(webhookData);
        break;
      default:
        console.log('Unhandled webhook event:', webhookData.type);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Partner webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handlePaymentSuccess(webhookData: any) {
  try {
    const { data, merchant } = webhookData;
    const orderId = data.order?.order_id;
    const amount = data.order?.order_amount;
    const currency = data.order?.order_currency;

    if (!orderId) {
      console.error('No order ID in payment success webhook');
      return;
    }

    // Update payment order status
    const { error: updateError } = await supabase
      .from('payment_orders')
      .update({
        status: 'COMPLETED',
        payment_status: 'SUCCESS',
        payment_time: new Date().toISOString(),
        webhook_data: webhookData
      })
      .eq('order_id', orderId);

    if (updateError) {
      console.error('Error updating payment order:', updateError);
    }

    // Add credits to user account
    const { data: orderData, error: orderError } = await supabase
      .from('payment_orders')
      .select('user_id, package_id')
      .eq('order_id', orderId)
      .single();

    if (orderError || !orderData) {
      console.error('Error fetching order data:', orderError);
      return;
    }

    // Get package details
    const packageDetails = {
      starter: { credits: 5 },
      pro: { credits: 30 }
    };

    const creditsToAdd = packageDetails[orderData.package_id as keyof typeof packageDetails]?.credits || 0;

    if (creditsToAdd > 0) {
      // Get current credits first
      const { data: currentCredits, error: fetchError } = await supabase
        .from('user_credits')
        .select('total_credits, remaining_credits')
        .eq('user_id', orderData.user_id)
        .single();

      if (fetchError) {
        console.error('Error fetching current credits:', fetchError);
        return;
      }

      // Update user credits
      const { error: creditsError } = await supabase
        .from('user_credits')
        .update({
          total_credits: (currentCredits.total_credits || 0) + creditsToAdd,
          remaining_credits: (currentCredits.remaining_credits || 0) + creditsToAdd
        })
        .eq('user_id', orderData.user_id);

      if (creditsError) {
        console.error('Error updating user credits:', creditsError);
      } else {
        console.log(`Added ${creditsToAdd} credits to user ${orderData.user_id}`);
      }
    }

  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

async function handlePaymentFailed(webhookData: any) {
  try {
    const { data } = webhookData;
    const orderId = data.order?.order_id;

    if (!orderId) return;

    // Update payment order status
    const { error: updateError } = await supabase
      .from('payment_orders')
      .update({
        status: 'FAILED',
        payment_status: 'FAILED',
        webhook_data: webhookData
      })
      .eq('order_id', orderId);

    if (updateError) {
      console.error('Error updating failed payment:', updateError);
    }

    console.log(`Payment failed for order ${orderId}`);

  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

async function handlePaymentDropped(webhookData: any) {
  try {
    const { data } = webhookData;
    const orderId = data.order?.order_id;

    if (!orderId) return;

    // Update payment order status
    const { error: updateError } = await supabase
      .from('payment_orders')
      .update({
        status: 'CANCELLED',
        payment_status: 'DROPPED',
        webhook_data: webhookData
      })
      .eq('order_id', orderId);

    if (updateError) {
      console.error('Error updating dropped payment:', updateError);
    }

    console.log(`Payment dropped for order ${orderId}`);

  } catch (error) {
    console.error('Error handling payment drop:', error);
  }
}
