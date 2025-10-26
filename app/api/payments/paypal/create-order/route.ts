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

    // Get real-time currency rate for the user's currency
    const currencyInfo = await getCurrencyWithRealTimeRate(currency);
    const convertedAmount = convertPrice(selectedPackage.priceUSD, currencyInfo);
    
    const paypalBusinessEmail = process.env.PAYPAL_BUSINESS_EMAIL || 'sudhanshu@scaleblogging.com';
    
    const returnUrl = `${process.env.NEXTAUTH_URL}/dashboard?payment=success&order_id=${orderId}`;
    const cancelUrl = `${process.env.NEXTAUTH_URL}/billing?payment=cancelled`;
    
    // Create PayPal payment URL with user's currency
    const approvalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalBusinessEmail)}&item_name=${encodeURIComponent(selectedPackage.name + ' - ' + selectedPackage.credits + ' credits')}&amount=${convertedAmount}&currency_code=${currency}&return=${encodeURIComponent(returnUrl)}&cancel_return=${encodeURIComponent(cancelUrl)}&custom=${orderId}`;
    
    console.log('PayPal payment URL created:', {
      currency: currency,
      originalAmountUSD: selectedPackage.priceUSD,
      convertedAmount: convertedAmount,
      exchangeRate: currencyInfo.rate,
      businessEmail: paypalBusinessEmail
    });

    return NextResponse.json({
      success: true,
      orderId: orderId,
      approvalUrl: approvalUrl,
      amount: convertedAmount,
      currency: currency,
      originalAmount: selectedPackage.priceUSD,
      originalCurrency: 'USD',
      exchangeRate: currencyInfo.rate,
      message: `PayPal payment link created successfully in ${currency}`
    });

  } catch (error) {
    console.error('PayPal create order error:', error);
    return NextResponse.json({ 
      error: 'PayPal order creation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}