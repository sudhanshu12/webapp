import { NextRequest, NextResponse } from 'next/server';
import { cashfreeConfig } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Test with a simple GET request to verify credentials
    const testResponse = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': cashfreeConfig.appId,
        'x-client-secret': cashfreeConfig.secretKey,
      }
    });

    const responseText = await testResponse.text();
    
    return NextResponse.json({
      success: true,
      status: testResponse.status,
      statusText: testResponse.statusText,
      headers: Object.fromEntries(testResponse.headers.entries()),
      body: responseText,
      config: {
        baseUrl: cashfreeConfig.baseUrl,
        appId: cashfreeConfig.appId,
        environment: cashfreeConfig.environment
      }
    });

  } catch (error) {
    console.error('Cashfree verify error:', error);
    return NextResponse.json({ 
      error: 'Failed to verify Cashfree API',
      details: error instanceof Error ? error.message : 'Unknown error',
      config: {
        baseUrl: cashfreeConfig.baseUrl,
        appId: cashfreeConfig.appId,
        environment: cashfreeConfig.environment
      }
    }, { status: 500 });
  }
}
