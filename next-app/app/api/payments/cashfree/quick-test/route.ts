import { NextRequest, NextResponse } from 'next/server';
import { cashfreeConfig } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    console.log('=== Cashfree Quick Test ===');
    console.log('App ID:', cashfreeConfig.appId);
    console.log('Secret Key:', cashfreeConfig.secretKey ? 'Set' : 'Not Set');
    console.log('Environment:', cashfreeConfig.environment);
    console.log('Partner API Key:', cashfreeConfig.partnerApiKey ? 'Set' : 'Not Set');
    console.log('Partner Merchant ID:', cashfreeConfig.partnerMerchantId ? 'Set' : 'Not Set');
    console.log('Use Partner Auth:', cashfreeConfig.usePartnerAuth);

    // Check if we have the minimum required credentials
    const hasBasicCredentials = cashfreeConfig.appId && cashfreeConfig.secretKey;
    const hasPartnerCredentials = cashfreeConfig.partnerApiKey && cashfreeConfig.partnerMerchantId;
    const isConfigured = hasBasicCredentials || hasPartnerCredentials;

    return NextResponse.json({
      success: true,
      message: 'Cashfree configuration check complete',
      configuration: {
        appId: cashfreeConfig.appId,
        secretKey: cashfreeConfig.secretKey ? 'Set' : 'Not Set',
        environment: cashfreeConfig.environment,
        partnerApiKey: cashfreeConfig.partnerApiKey ? 'Set' : 'Not Set',
        partnerMerchantId: cashfreeConfig.partnerMerchantId ? 'Set' : 'Not Set',
        usePartnerAuth: cashfreeConfig.usePartnerAuth
      },
      status: {
        hasBasicCredentials,
        hasPartnerCredentials,
        isConfigured,
        readyForPayments: isConfigured
      },
      nextSteps: isConfigured 
        ? 'Cashfree is configured! You can test payments now.'
        : 'Add CASHFREE_SECRET_KEY to your environment variables to enable payments.'
    });

  } catch (error) {
    console.error('Cashfree quick test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
