import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Simple admin authentication (you can make this more secure)
    const adminCredentials = {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123'
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
