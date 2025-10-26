import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { paymentPackages } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { orderId, userId, packageId, amount, currency, paymentMethod } = await req.json();

    if (!orderId || !userId) {
      return NextResponse.json({ error: 'Order ID and User ID are required' }, { status: 400 });
    }

    console.log('Auto-processing payment:', {
      orderId,
      userId,
      packageId,
      amount,
      currency,
      paymentMethod
    });

    // If packageId is provided, use it directly
    let finalPackageId = packageId;
    
    // If packageId is not provided, try to detect from amount
    if (!finalPackageId && amount) {
      // For testing amounts (₹1 / $0.01), we need to check the order details
      const { data: paymentOrder, error: orderError } = await supabase
        .from('payment_orders')
        .select('package_id')
        .eq('order_id', orderId)
        .single();

      if (!orderError && paymentOrder) {
        finalPackageId = paymentOrder.package_id;
        console.log('Detected package from payment_orders:', finalPackageId);
      } else {
        // Fallback: assume starter for small amounts
        finalPackageId = 'starter';
        console.log('Using fallback package detection: starter');
      }
    }

    const selectedPackage = paymentPackages[finalPackageId as keyof typeof paymentPackages];
    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    const creditsToAdd = selectedPackage.credits;

    // 1. Update user credits
    const { data: existingCredits, error: creditsError } = await supabase
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

    const { data: updatedCredits, error: updateCreditsError } = await supabase
      .from('user_credits')
      .upsert({
        user_id: userId,
        total_credits: newTotalCredits,
        used_credits: newUsedCredits,
        remaining_credits: newRemainingCredits,
        plan_type: finalPackageId,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (updateCreditsError) {
      console.error('Error updating user credits:', updateCreditsError);
      return NextResponse.json({ error: 'Failed to update user credits' }, { status: 500 });
    }

    // 2. Create purchase record
    const { error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        package_id: finalPackageId,
        credits_purchased: creditsToAdd,
        amount_paid: amount || selectedPackage.priceUSD,
        currency: currency || 'USD',
        order_id: orderId,
        transaction_id: orderId,
        payment_method: paymentMethod || 'auto',
        status: 'completed',
        created_at: new Date().toISOString()
      });

    if (purchaseError) {
      console.error('Error creating purchase record:', purchaseError);
    }

    console.log(`Auto-payment processed successfully: ${creditsToAdd} credits added to user ${userId}`);

    return NextResponse.json({
      success: true,
      message: `Payment processed automatically. Added ${creditsToAdd} credits.`,
      package: selectedPackage,
      credits: updatedCredits,
      creditsAdded: creditsToAdd,
      planChanged: true
    });

  } catch (error) {
    console.error('Auto-payment processing error:', error);
    return NextResponse.json({ 
      error: 'Auto-payment processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
