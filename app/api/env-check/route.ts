import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const envCheck = {
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'NOT_SET',
      VERCEL_CLIENT_ID: process.env.VERCEL_CLIENT_ID ? 'SET' : 'NOT_SET',
      VERCEL_CLIENT_SECRET: process.env.VERCEL_CLIENT_SECRET ? 'SET' : 'NOT_SET',
      VERCEL_REDIRECT_URI: process.env.VERCEL_REDIRECT_URI || 'NOT_SET',
    };

    const expectedVercelRedirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/vercel/callback`;

    return NextResponse.json({
      success: true,
      environment: envCheck,
      expectedRedirects: {
        vercel: expectedVercelRedirectUri
      },
      recommendations: {
        vercel: `Set VERCEL_REDIRECT_URI to: ${expectedVercelRedirectUri}`
      }
    });

  } catch (error) {
    console.error('Environment check error:', error)
    return NextResponse.json({ 
      error: 'Environment check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
