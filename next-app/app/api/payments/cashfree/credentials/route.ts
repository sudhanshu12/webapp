import { NextRequest, NextResponse } from 'next/server';
import { cashfreeConfig } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      credentials: {
        appId: cashfreeConfig.appId,
        secretKey: cashfreeConfig.secretKey,
        appIdLength: cashfreeConfig.appId.length,
        secretKeyLength: cashfreeConfig.secretKey.length,
        areSame: cashfreeConfig.appId === cashfreeConfig.secretKey,
        environment: cashfreeConfig.environment,
        baseUrl: cashfreeConfig.baseUrl
      },
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        CASHFREE_APP_ID: process.env.CASHFREE_APP_ID ? 'SET' : 'NOT_SET',
        CASHFREE_SECRET_KEY: process.env.CASHFREE_SECRET_KEY ? 'SET' : 'NOT_SET'
      }
    });

  } catch (error) {
    console.error('Credentials check error:', error);
    return NextResponse.json({ 
      error: 'Failed to check credentials',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
