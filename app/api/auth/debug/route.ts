import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // This endpoint helps debug OAuth configuration
  const config = {
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    googleClientIdLength: process.env.GOOGLE_CLIENT_ID?.length || 0,
    googleClientIdPrefix: process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...',
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    googleClientSecretLength: process.env.GOOGLE_CLIENT_SECRET?.length || 0,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    nextAuthSecretLength: process.env.NEXTAUTH_SECRET?.length || 0,
    expectedCallbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
    nodeEnv: process.env.NODE_ENV,
  };

  return NextResponse.json(config);
}

