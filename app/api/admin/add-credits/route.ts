import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { userId, creditsToAdd = 5 } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get current credits
    const { data: credits, error: fetchError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching credits:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 })
    }

    if (!credits) {
      // Create new credits record
      const { data: newCredits, error: createError } = await supabase
        .from('user_credits')
        .insert({
          user_id: userId,
          total_credits: creditsToAdd,
          used_credits: 0,
          plan_type: 'free'
        })
        .select()
        .single()

      if (createError) {
        console.error('Error creating credits:', createError)
        return NextResponse.json({ error: 'Failed to create credits' }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: `Added ${creditsToAdd} credits to user`,
        credits: newCredits
      })
    }

    // Update existing credits
    const newTotalCredits = credits.total_credits + creditsToAdd
    const { error: updateError } = await supabase
      .from('user_credits')
      .update({ 
        total_credits: newTotalCredits,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)

    if (updateError) {
      console.error('Error updating credits:', updateError)
      return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 })
    }

    // Record transaction
    await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: 'add',
        amount: creditsToAdd,
        description: `Admin added ${creditsToAdd} credits`
      })

    return NextResponse.json({
      success: true,
      message: `Added ${creditsToAdd} credits to user`,
      newTotalCredits,
      remainingCredits: newTotalCredits - credits.used_credits
    })

  } catch (error) {
    console.error('Add credits error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
