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

    const { planType, creditsToAdd, paymentMethodId, paymentIntentId } = await request.json()

    if (!planType || !creditsToAdd) {
      return NextResponse.json({ error: 'Plan type and credits to add are required' }, { status: 400 })
    }

    // Validate plan types
    const validPlans = ['free', 'pro', 'enterprise']
    if (!validPlans.includes(planType)) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 })
    }

    // Payment processing would go here
    // For now, we'll grant credits directly

    // Get current user credits
    const { data: credits, error: fetchError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching credits:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 })
    }

    // Calculate new total credits based on plan
    let newTotalCredits = creditsToAdd
    if (credits) {
      // Add to existing credits
      newTotalCredits = credits.total_credits + creditsToAdd
    }

    // Update or create user credits
    const { data: updatedCredits, error: updateError } = await supabase
      .from('user_credits')
      .upsert({
        user_id: userId,
        total_credits: newTotalCredits,
        used_credits: credits?.used_credits || 0,
        plan_type: planType,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single()

    if (updateError) {
      console.error('Error updating credits:', updateError)
      return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 })
    }

    // Record credit transaction
    const { error: transactionError } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: 'purchase',
        amount: creditsToAdd,
        description: `Plan upgrade: ${planType} (+${creditsToAdd} credits)`
      })

    if (transactionError) {
      console.error('Error recording transaction:', transactionError)
      // Don't fail the request for this, just log it
    }

    return NextResponse.json({
      success: true,
      totalCredits: updatedCredits.total_credits,
      usedCredits: updatedCredits.used_credits,
      remainingCredits: updatedCredits.total_credits - updatedCredits.used_credits,
      planType: updatedCredits.plan_type,
      creditsAdded: creditsToAdd
    })
  } catch (error) {
    console.error('Credit purchase error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
