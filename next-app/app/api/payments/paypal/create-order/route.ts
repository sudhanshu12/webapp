import { NextRequest, NextResponse } from 'next/server';
import { paymentPackages } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { packageId, userEmail, userId, currency } = await req.json();

    if (!packageId || !userEmail || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get package details
    const selectedPackage = paymentPackages[packageId as keyof typeof paymentPackages];
    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    // Generate unique order ID
    const orderId = `paypal_order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // For foreign currencies, use the original USD price
    const orderAmount = selectedPackage.priceUSD;
    
    console.log('PayPal order creation:', {
      packageId,
      orderId,
      orderAmount,
      currency,
      userEmail
    });

    // For foreign currencies, use PayPal with INR currency (since PayPal account only accepts INR)
    const paypalBusinessEmail = process.env.PAYPAL_BUSINESS_EMAIL || 'sudhanshu@scaleblogging.com';
    
    // Convert to INR for PayPal (since PayPal account only accepts INR)
    const inrRate = 88.7; // Current INR rate
    const inrAmount = Math.round(selectedPackage.priceUSD * inrRate);
    
    const returnUrl = `${process.env.NEXTAUTH_URL}/dashboard?payment=success&order_id=${orderId}`;
    const cancelUrl = `${process.env.NEXTAUTH_URL}/billing?payment=cancelled`;
    
    // Create PayPal payment URL with INR currency
    const approvalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalBusinessEmail)}&item_name=${encodeURIComponent(selectedPackage.name + ' - ' + selectedPackage.credits + ' credits')}&amount=${inrAmount}&currency_code=INR&return=${encodeURIComponent(returnUrl)}&cancel_return=${encodeURIComponent(cancelUrl)}&custom=${orderId}`;
    
    console.log('PayPal payment URL created for foreign currency:', {
      originalCurrency: currency,
      originalAmount: orderAmount,
      inrAmount: inrAmount,
      businessEmail: paypalBusinessEmail
    });

    return NextResponse.json({
      success: true,
      orderId: orderId,
      approvalUrl: approvalUrl,
      amount: inrAmount,
      currency: 'INR',
      originalAmount: orderAmount,
      originalCurrency: currency,
      message: 'PayPal payment link created successfully (converted to INR)'
    });

  } catch (error) {
    console.error('PayPal create order error:', error);
    return NextResponse.json({ 
      error: 'PayPal order creation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}