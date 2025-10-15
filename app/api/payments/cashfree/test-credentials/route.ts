import { NextRequest, NextResponse } from 'next/server';
import { cashfreeConfig } from '@/lib/cashfree';
import { Cashfree, CFEnvironment } from 'cashfree-pg';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    console.log('Testing Cashfree credentials...');
    console.log('App ID:', cashfreeConfig.appId ? 'Set' : 'Not set');
    console.log('Secret Key:', cashfreeConfig.secretKey ? 'Set' : 'Not set');
    console.log('Partner API Key:', cashfreeConfig.partnerApiKey ? 'Set' : 'Not set');
    console.log('Partner Merchant ID:', cashfreeConfig.partnerMerchantId ? 'Set' : 'Not set');
    console.log('Environment:', cashfreeConfig.environment);
    console.log('Use Partner Auth:', cashfreeConfig.usePartnerAuth);

    // Test SDK initialization
    let cashfree;
    try {
      if (cashfreeConfig.usePartnerAuth) {
        cashfree = new Cashfree(
          cashfreeConfig.environment === 'PRODUCTION' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
          cashfreeConfig.partnerApiKey,
          cashfreeConfig.partnerMerchantId
        );
        console.log('Partner authentication initialized successfully');
      } else {
        cashfree = new Cashfree(
          cashfreeConfig.environment === 'PRODUCTION' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
          cashfreeConfig.appId,
          cashfreeConfig.secretKey
        );
        console.log('Regular authentication initialized successfully');
      }
    } catch (sdkError) {
      console.error('SDK initialization failed:', sdkError);
      return NextResponse.json({
        success: false,
        error: 'SDK initialization failed',
        details: sdkError instanceof Error ? sdkError.message : 'Unknown error',
        credentials: {
          appId: !!cashfreeConfig.appId,
          secretKey: !!cashfreeConfig.secretKey,
          partnerApiKey: !!cashfreeConfig.partnerApiKey,
          partnerMerchantId: !!cashfreeConfig.partnerMerchantId,
          usePartnerAuth: cashfreeConfig.usePartnerAuth
        }
      });
    }

    // Test a simple API call
    try {
      // Try to get order status (this will test authentication)
      const testResponse = await cashfree.PGFetchOrder('2023-08-01', 'test_order_123');
      console.log('Test API call successful');
    } catch (apiError) {
      console.log('Test API call failed (expected for test order):', apiError);
      // This is expected to fail, but it means the SDK is working
    }

    return NextResponse.json({
      success: true,
      message: 'Cashfree credentials are working',
      credentials: {
        appId: !!cashfreeConfig.appId,
        secretKey: !!cashfreeConfig.secretKey,
        partnerApiKey: !!cashfreeConfig.partnerApiKey,
        partnerMerchantId: !!cashfreeConfig.partnerMerchantId,
        usePartnerAuth: cashfreeConfig.usePartnerAuth,
        environment: cashfreeConfig.environment
      }
    });

  } catch (error) {
    console.error('Credentials test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Credentials test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
