import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    console.log('Checking payment order for:', orderId);

    // Check payment_orders table
    const { data: paymentOrder, error: paymentError } = await supabase
      .from('payment_orders')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (paymentError && paymentError.code !== 'PGRST116') {
      console.error('Error fetching payment order:', paymentError);
      return NextResponse.json({ error: 'Failed to fetch payment order' }, { status: 500 });
    }

    // Check purchases table
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (purchaseError && purchaseError.code !== 'PGRST116') {
      console.error('Error fetching purchase:', purchaseError);
    }

    return NextResponse.json({
      success: true,
      orderId,
      paymentOrder: paymentOrder || null,
      purchase: purchase || null,
      hasPaymentOrder: !!paymentOrder,
      hasPurchase: !!purchase
    });

  } catch (error) {
    console.error('Check order API error:', error);
    return NextResponse.json({ 
      error: 'Failed to check order',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
