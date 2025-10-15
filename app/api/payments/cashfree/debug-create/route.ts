import { NextRequest, NextResponse } from 'next/server';
import { cashfreeConfig } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    console.log('=== Cashfree Debug Create Order ===');
    
    // Check configuration
    console.log('Config check:');
    console.log('- App ID:', cashfreeConfig.appId);
    console.log('- Secret Key:', cashfreeConfig.secretKey ? 'Set' : 'Not Set');
    console.log('- Environment:', cashfreeConfig.environment);
    console.log('- Base URL:', cashfreeConfig.baseUrl);
    console.log('- Use Partner Auth:', cashfreeConfig.usePartnerAuth);
    console.log('- Partner API Key:', cashfreeConfig.partnerApiKey ? 'Set' : 'Not Set');
    console.log('- Partner Merchant ID:', cashfreeConfig.partnerMerchantId ? 'Set' : 'Not Set');

    // Test simple order creation
    const testOrder = {
      order_id: `debug_${Date.now()}`,
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
        notify_url: `${process.env.NEXTAUTH_URL}/api/payments/cashfree/webhook`
      }
    };

    console.log('Creating test order:', testOrder);

    // Make direct API call
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
    console.log('Response status:', response.status);
    console.log('Response text:', responseText);

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      config: {
        appId: cashfreeConfig.appId,
        secretKey: cashfreeConfig.secretKey ? 'Set' : 'Not Set',
        environment: cashfreeConfig.environment,
        baseUrl: cashfreeConfig.baseUrl,
        usePartnerAuth: cashfreeConfig.usePartnerAuth
      },
      request: testOrder,
      response: responseText,
      headers: Object.fromEntries(response.headers.entries())
    });

  } catch (error) {
    console.error('Debug create order error:', error);
    return NextResponse.json({
      success: false,
      error: 'Debug failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      config: {
        appId: cashfreeConfig.appId,
        secretKey: cashfreeConfig.secretKey ? 'Set' : 'Not Set',
        environment: cashfreeConfig.environment,
        baseUrl: cashfreeConfig.baseUrl
      }
    }, { status: 500 });
  }
}
