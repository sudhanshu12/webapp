import { NextRequest, NextResponse } from 'next/server';
import { paymentPackages } from '@/lib/cashfree';
import { getCurrencyWithRealTimeRate, convertPrice } from '@/lib/currency';

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

    console.log('PayPal order creation:', {
      packageId,
      orderId,
      currency,
      userEmail
    });

    // Simple currency handling: INR for India, USD for all foreign countries
    let paymentCurrency, paymentAmount;
    
    if (currency === 'INR') {
      // For India, convert USD to INR
      const inrRate = 88.7; // Fixed INR rate
      paymentCurrency = 'INR';
      paymentAmount = Math.round(selectedPackage.priceUSD * inrRate);
    } else {
      // For all foreign countries, use USD
      paymentCurrency = 'USD';
      paymentAmount = selectedPackage.priceUSD;
    }
    
    const paypalBusinessEmail = process.env.PAYPAL_BUSINESS_EMAIL || 'sudhanshu@scaleblogging.com';
    
    const returnUrl = `${process.env.NEXTAUTH_URL}/dashboard?payment=success&order_id=${orderId}`;
    const cancelUrl = `${process.env.NEXTAUTH_URL}/billing?payment=cancelled`;
    
    // Create PayPal payment URL
    const approvalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalBusinessEmail)}&item_name=${encodeURIComponent(selectedPackage.name + ' - ' + selectedPackage.credits + ' credits')}&amount=${paymentAmount}&currency_code=${paymentCurrency}&return=${encodeURIComponent(returnUrl)}&cancel_return=${encodeURIComponent(cancelUrl)}&custom=${orderId}`;
    
    console.log('PayPal payment URL created:', {
      userCurrency: currency,
      paymentCurrency: paymentCurrency,
      paymentAmount: paymentAmount,
      originalAmountUSD: selectedPackage.priceUSD,
      businessEmail: paypalBusinessEmail
    });

    return NextResponse.json({
      success: true,
      orderId: orderId,
      approvalUrl: approvalUrl,
      amount: paymentAmount,
      currency: paymentCurrency,
      originalAmount: selectedPackage.priceUSD,
      originalCurrency: 'USD',
      message: `PayPal payment link created successfully in ${paymentCurrency}`
    });

  } catch (error) {
    console.error('PayPal create order error:', error);
    return NextResponse.json({ 
      error: 'PayPal order creation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}