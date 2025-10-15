import { NextRequest, NextResponse } from 'next/server';
import { cashfreeConfig } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Test different Cashfree API endpoints
    const endpoints = [
      `${cashfreeConfig.baseUrl}/orders`,
      `https://api.cashfree.com/pg/orders`,
      `https://api.cashfree.com/pg/v1/orders`,
      `https://api.cashfree.com/pg/v2/orders`
    ];

    const results = [];

    for (const endpoint of endpoints) {
      try {
        const testResponse = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-version': '2023-08-01',
            'x-client-id': cashfreeConfig.appId,
            'x-client-secret': cashfreeConfig.secretKey,
          }
        });

        results.push({
          endpoint,
          status: testResponse.status,
          statusText: testResponse.statusText,
          ok: testResponse.ok
        });
      } catch (err) {
        results.push({
          endpoint,
          error: err instanceof Error ? err.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
      config: {
        baseUrl: cashfreeConfig.baseUrl,
        appId: cashfreeConfig.appId,
        environment: cashfreeConfig.environment
      }
    });

  } catch (error) {
    console.error('Cashfree test error:', error);
    return NextResponse.json({ 
      error: 'Failed to connect to Cashfree API',
      details: error instanceof Error ? error.message : 'Unknown error',
      config: {
        baseUrl: cashfreeConfig.baseUrl,
        appId: cashfreeConfig.appId,
        environment: cashfreeConfig.environment
      }
    }, { status: 500 });
  }
}
