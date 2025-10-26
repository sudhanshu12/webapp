import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { orderId, userEmail } = await req.json();

    if (!orderId || !userEmail) {
      return NextResponse.json({ error: 'Order ID and user email are required' }, { status: 400 });
    }

    console.log('Testing dashboard payment processing:', { orderId, userEmail });

    // Get user ID from email
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = userData.id;

    // Check if payment_orders exists
    const { data: paymentOrder, error: orderError } = await supabase
      .from('payment_orders')
      .select('package_id')
      .eq('order_id', orderId)
      .single();

    let packageId = 'starter'; // Default to starter for 5-credit plan
    if (!orderError && paymentOrder) {
      packageId = paymentOrder.package_id;
    }

    console.log('Detected package:', packageId);

    // Process the payment
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'https://createawebsite.click'}/api/auto-process-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: orderId,
        userId: userId,
        packageId: packageId,
        paymentMethod: 'dashboard_test'
      })
    });

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Dashboard payment processing test completed',
      userId: userId,
      packageId: packageId,
      result: result
    });

  } catch (error) {
    console.error('Dashboard payment test error:', error);
    return NextResponse.json({ 
      error: 'Dashboard payment test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
