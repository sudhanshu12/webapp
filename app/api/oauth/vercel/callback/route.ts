import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    // Debug logging
    console.log('Vercel OAuth Callback Debug:', {
      code: code ? 'Present' : 'Missing',
      state: state ? 'Present' : 'Missing',
      error: error || 'None',
      appUrl: process.env.NEXT_PUBLIC_APP_URL,
      fullUrl: request.url
    });

    if (error) {
      console.log('OAuth error detected:', error);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/deploy?error=${encodeURIComponent(error)}`)
    }

    if (!code) {
      console.log('No authorization code received');
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/deploy?error=missing_code`)
    }

    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/deploy?code=${code}&state=${state}&platform=vercel`;
    console.log('Redirecting to:', redirectUrl);

    // Redirect back to deployment page with the authorization code
    return NextResponse.redirect(redirectUrl)

  } catch (error) {
    console.error('Vercel OAuth callback error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/deploy?error=callback_error`)
  }
}
