import { NextRequest, NextResponse } from 'next/server';
import { lemonSqueezyConfig, getCreditPackage } from '@/lib/lemonsqueezy';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-signature');

    if (!signature) {
      console.error('No signature provided');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', lemonSqueezyConfig.webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);
    console.log('Lemon Squeezy webhook received:', event.type);

    // Handle different event types
    switch (event.type) {
      case 'order_created':
        await handleOrderCreated(event.data);
        break;
      case 'order_refunded':
        await handleOrderRefunded(event.data);
        break;
      default:
        console.log('Unhandled webhook event:', event.type);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handleOrderCreated(orderData: any) {
  try {
    console.log('Processing order created:', orderData.id);

    // Extract custom data from order
    const customData = orderData.attributes.custom_data;
    const userId = customData?.user_id;
    const packageId = customData?.package_id;

    if (!userId || !packageId) {
      console.error('Missing user_id or package_id in order data');
      return;
    }

    // Get package details
    const packageData = getCreditPackage(packageId);
    if (!packageData) {
      console.error('Invalid package ID:', packageId);
      return;
    }

    // Add credits to user account
    const { data: userCredits, error: fetchError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching user credits:', fetchError);
      return;
    }

    // Update credits
    const newTotalCredits = userCredits.total_credits + packageData.credits;
    const newRemainingCredits = userCredits.remaining_credits + packageData.credits;

    const { error: updateError } = await supabase
      .from('user_credits')
      .update({
        total_credits: newTotalCredits,
        remaining_credits: newRemainingCredits,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error updating user credits:', updateError);
      return;
    }

    // Create purchase record
    const { error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        package_id: packageId,
        credits_purchased: packageData.credits,
        amount_paid: packageData.price,
        order_id: orderData.id,
        status: 'completed',
        created_at: new Date().toISOString()
      });

    if (purchaseError) {
      console.error('Error creating purchase record:', purchaseError);
    }

    // Update pending purchase status
    const { error: pendingError } = await supabase
      .from('pending_purchases')
      .update({ status: 'completed' })
      .eq('user_id', userId)
      .eq('package_id', packageId)
      .eq('status', 'pending');

    if (pendingError) {
      console.error('Error updating pending purchase:', pendingError);
    }

    console.log(`Successfully added ${packageData.credits} credits to user ${userId}`);

  } catch (error) {
    console.error('Error handling order created:', error);
  }
}

async function handleOrderRefunded(orderData: any) {
  try {
    console.log('Processing order refunded:', orderData.id);

    // Find the purchase record
    const { data: purchase, error: fetchError } = await supabase
      .from('purchases')
      .select('*')
      .eq('order_id', orderData.id)
      .single();

    if (fetchError || !purchase) {
      console.error('Purchase record not found for order:', orderData.id);
      return;
    }

    // Get package details
    const packageData = getCreditPackage(purchase.package_id);
    if (!packageData) {
      console.error('Invalid package ID:', purchase.package_id);
      return;
    }

    // Remove credits from user account
    const { data: userCredits, error: creditsError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', purchase.user_id)
      .single();

    if (creditsError) {
      console.error('Error fetching user credits:', creditsError);
      return;
    }

    // Update credits (subtract the refunded amount)
    const newTotalCredits = Math.max(0, userCredits.total_credits - packageData.credits);
    const newRemainingCredits = Math.max(0, userCredits.remaining_credits - packageData.credits);

    const { error: updateError } = await supabase
      .from('user_credits')
      .update({
        total_credits: newTotalCredits,
        remaining_credits: newRemainingCredits,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', purchase.user_id);

    if (updateError) {
      console.error('Error updating user credits after refund:', updateError);
      return;
    }

    // Update purchase status
    const { error: statusError } = await supabase
      .from('purchases')
      .update({ status: 'refunded' })
      .eq('id', purchase.id);

    if (statusError) {
      console.error('Error updating purchase status:', statusError);
    }

    console.log(`Successfully refunded ${packageData.credits} credits for user ${purchase.user_id}`);

  } catch (error) {
    console.error('Error handling order refunded:', error);
  }
}
