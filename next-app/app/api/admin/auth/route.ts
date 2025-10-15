import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Admin authentication with environment variables
    const adminCredentials = {
      username: process.env.ADMIN_USERNAME || 'sudhanshuxmen@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'NMR@P@ssw0rd@1234'
    }

    if (username === adminCredentials.username && password === adminCredentials.password) {
      return NextResponse.json({
        success: true,
        message: 'Admin authentication successful'
      })
    } else {
      return NextResponse.json({ 
        error: 'Invalid admin credentials' 
      }, { status: 401 })
    }

  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json({ 
      error: 'Authentication failed' 
    }, { status: 500 })
  }
}
