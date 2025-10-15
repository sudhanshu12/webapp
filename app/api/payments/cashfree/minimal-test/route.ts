import { NextRequest, NextResponse } from 'next/server';
import { cashfreeConfig } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Create a minimal test order
    const testOrder = {
      order_id: `test_${Date.now()}`,
      order_amount: 1.00,
      order_currency: 'INR',
      customer_details: {
        customer_id: 'test_customer',
        customer_name: 'Test Customer',
        customer_email: 'test@example.com',
        customer_phone: '9999999999'
      },
      order_meta: {
        return_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
        notify_url: `${process.env.NEXTAUTH_URL}/api/payments/cashfree/webhook`
      }
    };

    const cashfreeResponse = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': cashfreeConfig.appId,
        'x-client-secret': cashfreeConfig.secretKey,
      },
      body: JSON.stringify(testOrder)
    });

    const responseText = await cashfreeResponse.text();
    
    return NextResponse.json({
      success: true,
      status: cashfreeResponse.status,
      statusText: cashfreeResponse.statusText,
      headers: Object.fromEntries(cashfreeResponse.headers.entries()),
      body: responseText,
      requestBody: testOrder,
      config: {
        baseUrl: cashfreeConfig.baseUrl,
        appId: cashfreeConfig.appId,
        environment: cashfreeConfig.environment
      }
    });

  } catch (error) {
    console.error('Cashfree minimal test error:', error);
    return NextResponse.json({ 
      error: 'Failed to create test order',
      details: error instanceof Error ? error.message : 'Unknown error',
      config: {
        baseUrl: cashfreeConfig.baseUrl,
        appId: cashfreeConfig.appId,
        environment: cashfreeConfig.environment
      }
    }, { status: 500 });
  }
}
