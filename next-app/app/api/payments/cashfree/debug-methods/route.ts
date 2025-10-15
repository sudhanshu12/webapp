import { NextRequest, NextResponse } from 'next/server';
import { cashfreeConfig } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Create a test order to see what payment methods are available
    const testOrder = {
      order_id: `debug_methods_${Date.now()}`,
      order_amount: 1.00,
      order_currency: 'INR',
      customer_details: {
        customer_id: 'debug_customer',
        customer_name: 'Debug Customer',
        customer_email: 'debug@example.com',
        customer_phone: '9999999999'
      },
      order_meta: {
        return_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
        notify_url: `${process.env.NEXTAUTH_URL}/api/payments/cashfree/webhook`,
        payment_methods: 'cc,dc,upi,nb,paypal,emi,paylater,app,ppc,ccc'
      }
    };

    console.log('Testing payment methods with order:', testOrder);

    const response = await fetch(`${cashfreeConfig.baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': cashfreeConfig.appId,
        'x-client-secret': cashfreeConfig.secretKey,
      },
      body: JSON.stringify(testOrder)
    });

    const responseText = await response.text();
    console.log('Cashfree response for payment methods:', response.status, responseText);

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: 'Failed to create test order',
        details: responseText,
        status: response.status
      }, { status: 500 });
    }

    const cashfreeData = JSON.parse(responseText);
    
    return NextResponse.json({
      success: true,
      orderData: cashfreeData,
      paymentMethods: cashfreeData.order_meta?.payment_methods,
      paymentUrl: cashfreeData.payments?.url,
      config: {
        appId: cashfreeConfig.appId,
        environment: cashfreeConfig.environment,
        baseUrl: cashfreeConfig.baseUrl
      }
    });

  } catch (error) {
    console.error('Debug payment methods error:', error);
    return NextResponse.json({
      success: false,
      error: 'Debug failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
