import { NextRequest, NextResponse } from 'next/server';
import { cashfreeConfig, paymentPackages } from '@/lib/cashfree';
import { CURRENCIES, convertPrice } from '@/lib/currency';

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
    
    console.log('Selected package:', selectedPackage);
    console.log('Package priceUSD:', selectedPackage.priceUSD);

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.log('Package details:');
    console.log('- packageId:', packageId);
    console.log('- selectedPackage.priceUSD:', selectedPackage.priceUSD);
    console.log('- userCurrency:', currency);
    
    // Cashfree only supports INR for this merchant account
    if (currency !== 'INR') {
      return NextResponse.json({ 
        error: 'Cashfree only supports INR currency. Please use PayPal for foreign currencies.',
        supportedCurrency: 'INR',
        requestedCurrency: currency
      }, { status: 400 });
    }
    
    // Convert USD to INR for Cashfree
    const inrRate = 88.7; // Fixed INR rate
    const convertedPrice = Math.round(selectedPackage.priceUSD * inrRate);
    const orderCurrency = 'INR';
    
    console.log('Currency conversion for Cashfree:', {
      userCurrency: currency,
      orderCurrency: orderCurrency,
      usdPrice: selectedPackage.priceUSD,
      convertedPrice: convertedPrice
    });
    
    console.log('Real-time currency conversion:', {
      packageId,
      usdPrice: selectedPackage.priceUSD,
      currency,
      convertedPrice
    });
    
    console.log('Price conversion debug:');
    console.log('- Package ID:', packageId);
    console.log('- Original USD price:', selectedPackage.priceUSD);
    console.log('- Converted price:', convertedPrice);
    console.log('- Force redeploy test');

    // Create order payload for Cashfree with all currencies and PayPal support
    const orderPayload = {
      order_id: orderId,
      order_amount: convertedPrice,
      order_currency: orderCurrency,
      customer_details: {
        customer_id: userId,
        customer_name: userEmail.split('@')[0],
        customer_email: userEmail,
        customer_phone: '9999999999'
      },
      order_meta: {
        return_url: `https://createawebsite.click/dashboard?payment=success&order_id=${orderId}`,
        notify_url: `https://createawebsite.click/api/payments/cashfree/webhook`,
        payment_methods: 'cc,dc,upi,nb,paypal,emi,paylater' // Include PayPal for all currencies
      },
      order_note: `Payment for ${selectedPackage.name} - ${selectedPackage.credits} credits (${currency} ${convertedPrice})`
    };

    console.log('Creating Cashfree order with payload:', orderPayload);
    console.log('Payment methods being sent:', orderPayload.order_meta.payment_methods);

    // Make direct API call to Cashfree
    const response = await fetch(`${cashfreeConfig.baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': cashfreeConfig.appId,
        'x-client-secret': cashfreeConfig.secretKey,
      },
      body: JSON.stringify(orderPayload)
    });

    const responseText = await response.text();
    console.log('Cashfree API response:', response.status, responseText);

    if (!response.ok) {
      console.error('Cashfree API error:', response.status, responseText);
      
      // Try to parse error response for better error message
      let errorMessage = 'Cashfree payment creation failed';
      try {
        const errorData = JSON.parse(responseText);
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (e) {
        // Use default error message if parsing fails
      }
      
      return NextResponse.json({ 
        error: errorMessage,
        details: responseText,
        status: response.status,
        cashfreeConfig: {
          baseUrl: cashfreeConfig.baseUrl,
          environment: cashfreeConfig.environment,
          hasAppId: !!cashfreeConfig.appId,
          hasSecretKey: !!cashfreeConfig.secretKey
        }
      }, { status: 500 });
    }

    const cashfreeData = JSON.parse(responseText);
    console.log('Cashfree order created:', cashfreeData);

    if (!cashfreeData.payment_session_id) {
      console.error('No payment session ID in response:', cashfreeData);
      return NextResponse.json({ 
        error: 'No payment session ID received from Cashfree',
        details: cashfreeData
      }, { status: 500 });
    }

    console.log('Final response - convertedPrice:', convertedPrice, 'selectedPackage.priceUSD:', selectedPackage.priceUSD);
    console.log('Cashfree response amount:', cashfreeData.order_amount);
    
    // Always use the converted INR amount
    const finalAmount = convertedPrice;
    console.log('Final amount being returned:', finalAmount);
    console.log('Debug - convertedPrice value:', convertedPrice);
    console.log('Debug - typeof convertedPrice:', typeof convertedPrice);
    
    return NextResponse.json({
      success: true,
      paymentSessionId: cashfreeData.payment_session_id,
      orderId: cashfreeData.order_id,
      orderAmount: finalAmount, // Use the converted amount, not Cashfree's response
      orderCurrency: orderCurrency,
      paymentUrl: cashfreeData.payments?.url,
      cashfreeOrderId: cashfreeData.cf_order_id,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Simple create order error:', error);
    return NextResponse.json({ 
      error: 'Payment creation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
