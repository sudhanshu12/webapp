import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function GET() {
  try {
    // For testing - use a hardcoded user ID
    const userId = 'test_user_123'
    
    // Get user's credit information
    const { data: credits, error } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error fetching credits:', error)
      return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 })
    }

    // If no credits record exists, create one with default free plan
    if (!credits) {
      const { data: newCredits, error: createError } = await supabase
        .from('user_credits')
        .insert({
          user_id: userId,
          total_credits: 1, // Free plan gets 1 credit
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
        totalCredits: newCredits.total_credits,
        usedCredits: newCredits.used_credits,
        remainingCredits: newCredits.total_credits - newCredits.used_credits,
        planType: newCredits.plan_type
      })
    }

    return NextResponse.json({
      totalCredits: credits.total_credits,
      usedCredits: credits.used_credits,
      remainingCredits: credits.total_credits - credits.used_credits,
      planType: credits.plan_type
    })
  } catch (error) {
    console.error('Credits check error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
