import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase'

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ 
        error: 'Service role key not configured',
        serviceRoleConfigured: false 
      }, { status: 500 })
    }

    // Test if we can query users with service role
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('id, email')
      .limit(5)

    if (error) {
      return NextResponse.json({ 
        error: 'Service role query failed',
        errorDetails: error.message,
        serviceRoleConfigured: true 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Service role key is working',
      serviceRoleConfigured: true,
      userCount: users?.length || 0,
      sampleUsers: users?.map(u => ({ id: u.id, email: u.email })) || []
    })

  } catch (error) {
    console.error('Service role test error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      serviceRoleConfigured: false 
    }, { status: 500 })
  }
}
