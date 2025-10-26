import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { userId, packageId, orderId, amount, currency, paymentMethod } = await request.json();

    if (!userId || !packageId) {
      return NextResponse.json({ error: 'User ID and Package ID are required' }, { status: 400 });
    }

    console.log('Creating purchase record:', {
      userId,
      packageId,
      orderId,
      amount,
      currency,
      paymentMethod
    });

    // Create purchase record directly
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        package_id: packageId,
        credits_purchased: packageId === 'starter' ? 5 : 30,
        amount_paid: amount || 0.01,
        currency: currency || 'INR',
        order_id: orderId || `manual_${Date.now()}`,
        transaction_id: `txn_${Date.now()}`,
        payment_method: paymentMethod || 'cashfree',
        status: 'completed',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (purchaseError) {
      console.error('Error creating purchase record:', purchaseError);
      return NextResponse.json({ 
        error: 'Failed to create purchase record',
        details: purchaseError.message
      }, { status: 500 });
    }

    console.log('Purchase record created successfully:', purchase);

    return NextResponse.json({
      success: true,
      message: 'Purchase record created successfully',
      purchase
    });

  } catch (error) {
    console.error('Create purchase record error:', error);
    return NextResponse.json({ 
      error: 'Failed to create purchase record',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
