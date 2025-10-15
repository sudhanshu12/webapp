import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get user's OAuth connections
    const { data: connections, error } = await supabase
      .from('oauth_connections')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching connections:', error)
      return NextResponse.json({ error: 'Failed to fetch connections' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      connections: connections || []
    })

  } catch (error) {
    console.error('Connections fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId, platform } = await request.json()

    if (!userId || !platform) {
      return NextResponse.json({ error: 'User ID and platform are required' }, { status: 400 })
    }

    // Delete OAuth connection
    const { error } = await supabase
      .from('oauth_connections')
      .delete()
      .eq('user_id', userId)
      .eq('platform', platform)

    if (error) {
      console.error('Error deleting connection:', error)
      return NextResponse.json({ error: 'Failed to delete connection' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Disconnected from ${platform}`
    })

  } catch (error) {
    console.error('Connection delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
