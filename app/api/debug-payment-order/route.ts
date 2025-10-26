import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin client not initialized' }, { status: 500 });
    }

    // Check payment_orders table
    const { data: paymentOrder, error: orderError } = await supabaseAdmin
      .from('payment_orders')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (orderError) {
      console.error('Error fetching payment order:', orderError);
      return NextResponse.json({ 
        error: 'Payment order not found', 
        details: orderError.message,
        orderId 
      }, { status: 404 });
    }

    // Check if user exists
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', paymentOrder.user_id)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json({ 
        error: 'User not found', 
        details: userError.message,
        userId: paymentOrder.user_id 
      }, { status: 404 });
    }

    // Check user credits
    const { data: credits, error: creditsError } = await supabaseAdmin
      .from('user_credits')
      .select('*')
      .eq('user_id', paymentOrder.user_id)
      .single();

    return NextResponse.json({
      success: true,
      orderId,
      paymentOrder,
      user,
      credits: credits || null,
      creditsError: creditsError?.message || null
    });

  } catch (error) {
    console.error('Debug payment order error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
