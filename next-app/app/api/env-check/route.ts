import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    // NextAuth configuration
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL || 'NOT SET',
    googleClientIdLength: process.env.GOOGLE_CLIENT_ID?.length || 0,
    googleClientSecretLength: process.env.GOOGLE_CLIENT_SECRET?.length || 0,
    
    // Cashfree configuration
    hasCashfreeAppId: !!process.env.CASHFREE_APP_ID,
    hasCashfreeSecretKey: !!process.env.CASHFREE_SECRET_KEY,
    cashfreeEnvironment: process.env.CASHFREE_ENVIRONMENT || 'not set',
    hasCashfreePartnerApiKey: !!process.env.CASHFREE_PARTNER_API_KEY,
    hasCashfreePartnerMerchantId: !!process.env.CASHFREE_PARTNER_MERCHANT_ID,
    
    // PayPal configuration
    hasPaypalClientId: !!process.env.PAYPAL_CLIENT_ID,
    hasPaypalClientSecret: !!process.env.PAYPAL_CLIENT_SECRET,
    hasPaypalBusinessEmail: !!process.env.PAYPAL_BUSINESS_EMAIL,
    
    // Payment system status
    cashfreeConfigured: !!(process.env.CASHFREE_SECRET_KEY || process.env.CASHFREE_PARTNER_API_KEY),
    paypalConfigured: !!process.env.PAYPAL_CLIENT_ID,
    paymentSystemsAvailable: {
      cashfree: !!(process.env.CASHFREE_SECRET_KEY || process.env.CASHFREE_PARTNER_API_KEY),
      paypal: !!process.env.PAYPAL_CLIENT_ID
    }
  });
}
