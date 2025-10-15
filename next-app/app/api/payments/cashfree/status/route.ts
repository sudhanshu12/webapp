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

    // Get order status from database
    const { data: orderData, error } = await supabase
      .from('payment_orders')
      .select('*')
      .eq('cashfree_order_id', orderId)
      .single();

    if (error || !orderData) {
      console.error('Error fetching order status:', error);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({
      orderId: orderData.cashfree_order_id,
      status: orderData.status,
      paymentStatus: orderData.payment_status,
      amount: orderData.amount,
      currency: orderData.currency,
      packageId: orderData.package_id,
      createdAt: orderData.created_at,
      updatedAt: orderData.updated_at
    });

  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
