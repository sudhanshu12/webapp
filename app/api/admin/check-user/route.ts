import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase'

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 })
    }

    // Check if specific user exists
    const userId = 'd339b211-2fee-4dce-a4cf-aeb23b296132'
    
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, first_name, last_name')
      .eq('id', userId)
      .single()

    return NextResponse.json({
      success: true,
      userId,
      userExists: !!user,
      user: user || null,
      error: error?.message || null
    })

  } catch (error) {
    console.error('Database check error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 })
  }
}
