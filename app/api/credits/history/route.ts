import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get user ID from request headers (sent by client)
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get credit transactions
    const { data: transactions, error: transactionError } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (transactionError) {
      console.error('Error fetching transactions:', transactionError)
      return NextResponse.json({ error: 'Failed to fetch transaction history' }, { status: 500 })
    }

    // Get site creations
    const { data: sites, error: siteError } = await supabase
      .from('site_creations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (siteError) {
      console.error('Error fetching sites:', siteError)
      return NextResponse.json({ error: 'Failed to fetch site history' }, { status: 500 })
    }

    // Combine and sort by date
    const combinedHistory = [
      ...(transactions || []).map(t => ({ ...t, type: 'transaction' })),
      ...(sites || []).map(s => ({ ...s, type: 'site_creation' }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return NextResponse.json({
      history: combinedHistory,
      total: combinedHistory.length
    })
  } catch (error) {
    console.error('History fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
