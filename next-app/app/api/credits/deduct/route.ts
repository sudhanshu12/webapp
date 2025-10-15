import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Get user ID from request headers (sent by client)
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { siteName, creditsToDeduct = 1 } = await request.json()

    if (!siteName) {
      return NextResponse.json({ error: 'Site name is required' }, { status: 400 })
    }

    // Check if user has enough credits
    const { data: credits, error: fetchError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (fetchError) {
      console.error('Error fetching credits:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 })
    }

    if (!credits) {
      return NextResponse.json({ error: 'No credits found for user' }, { status: 404 })
    }

    const remainingCredits = credits.total_credits - credits.used_credits
    if (remainingCredits < creditsToDeduct) {
      return NextResponse.json({ 
        error: 'Insufficient credits',
        remainingCredits,
        requiredCredits: creditsToDeduct
      }, { status: 400 })
    }

    // Start a transaction to deduct credits and record site creation
    const newUsedCredits = credits.used_credits + creditsToDeduct

    // Update credits
    const { error: updateError } = await supabase
      .from('user_credits')
      .update({ 
        used_credits: newUsedCredits,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)

    if (updateError) {
      console.error('Error updating credits:', updateError)
      return NextResponse.json({ error: 'Failed to deduct credits' }, { status: 500 })
    }

    // Record site creation
    const { error: siteError } = await supabase
      .from('site_creations')
      .insert({
        user_id: userId,
        site_name: siteName,
        credits_used: creditsToDeduct,
        status: 'completed'
      })

    if (siteError) {
      console.error('Error recording site creation:', siteError)
      // Rollback credits if site recording fails
      await supabase
        .from('user_credits')
        .update({ used_credits: credits.used_credits })
        .eq('user_id', userId)
      return NextResponse.json({ error: 'Failed to record site creation' }, { status: 500 })
    }

    // Record credit transaction
    const { error: transactionError } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: 'deduct',
        amount: creditsToDeduct,
        description: `Site creation: ${siteName}`
      })

    if (transactionError) {
      console.error('Error recording transaction:', transactionError)
      // Don't fail the request for this, just log it
    }

    return NextResponse.json({
      success: true,
      remainingCredits: credits.total_credits - newUsedCredits,
      usedCredits: newUsedCredits,
      totalCredits: credits.total_credits
    })
  } catch (error) {
    console.error('Credit deduction error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
