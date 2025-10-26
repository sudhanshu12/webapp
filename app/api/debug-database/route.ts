import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    console.log('Debug: Checking database tables for user:', userId);

    // Check purchases table
    const { data: purchases, error: purchasesError } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    console.log('Purchases query result:', { purchases, purchasesError });

    // Check payment_orders table
    const { data: paymentOrders, error: ordersError } = await supabase
      .from('payment_orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    console.log('Payment orders query result:', { paymentOrders, ordersError });

    // Check user_credits table
    const { data: credits, error: creditsError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    console.log('User credits query result:', { credits, creditsError });

    return NextResponse.json({
      success: true,
      userId,
      purchases: purchases || [],
      paymentOrders: paymentOrders || [],
      credits: credits || null,
      errors: {
        purchasesError: purchasesError?.message,
        ordersError: ordersError?.message,
        creditsError: creditsError?.message
      }
    });

  } catch (error) {
    console.error('Debug database error:', error);
    return NextResponse.json({ 
      error: 'Debug failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
