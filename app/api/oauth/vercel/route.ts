import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

const VERCEL_CLIENT_ID = process.env.VERCEL_CLIENT_ID
const VERCEL_CLIENT_SECRET = process.env.VERCEL_CLIENT_SECRET
const VERCEL_REDIRECT_URI = process.env.VERCEL_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/vercel/callback`

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (action === 'authorize') {
      // Generate OAuth URL for Vercel
      const state = generateRandomState()
      const oauthUrl = `https://vercel.com/oauth/authorize?client_id=${VERCEL_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(VERCEL_REDIRECT_URI)}&scope=read,write&state=${state}`
      
      return NextResponse.json({
        success: true,
        oauthUrl,
        state
      })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Vercel OAuth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, state, userId } = await request.json()
    
    if (!code || !userId) {
      return NextResponse.json({ error: 'Missing authorization code or user ID' }, { status: 400 })
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://api.vercel.com/v2/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: VERCEL_CLIENT_ID!,
        client_secret: VERCEL_CLIENT_SECRET!,
        code: code,
        redirect_uri: VERCEL_REDIRECT_URI!
      })
    })

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text()
      console.error('Vercel token exchange failed:', error)
      return NextResponse.json({ error: 'Failed to exchange authorization code' }, { status: 400 })
    }

    const tokenData = await tokenResponse.json()
    
    // Get user info from Vercel
    const userResponse = await fetch('https://api.vercel.com/v2/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    })

    if (!userResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch user info' }, { status: 400 })
    }

    const userInfo = await userResponse.json()

    // Store OAuth connection in database
    const { error: dbError } = await supabase
      .from('oauth_connections')
      .upsert({
        user_id: userId,
        platform: 'vercel',
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        token_expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
        platform_user_id: userInfo.id,
        platform_username: userInfo.email
      }, {
        onConflict: 'user_id,platform'
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Failed to store connection' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Vercel',
      userInfo: {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name
      }
    })

  } catch (error) {
    console.error('Vercel OAuth callback error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateRandomState(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
