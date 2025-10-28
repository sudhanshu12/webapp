import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get user email or ID from request headers
    const userEmail = request.headers.get('x-user-email')
    const userId = request.headers.get('x-user-id')
    
    if (!userEmail && !userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let finalUserId = userId;

    // If we have email but not ID, fetch the user ID from email
    if (userEmail && !userId) {
      // Check cache first (simple in-memory cache for this request)
      const cacheKey = `user_id_${userEmail}`;
      
      // Try to get from a simple cache (you could use Redis or similar for production)
      // For now, we'll optimize the query instead
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single()

      if (userError || !user) {
        console.error('Error fetching user by email:', userError)
        // Return default credits even if user not found
        return NextResponse.json({
          totalCredits: 1,
          usedCredits: 0,
          remainingCredits: 1,
          planType: 'free'
        })
      }

      finalUserId = user.id
    }

    if (!finalUserId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 404 })
    }

    // Get user's credit information with optimized query
    const { data: credits, error } = await supabase
      .from('user_credits')
      .select('total_credits, used_credits, plan_type')
      .eq('user_id', finalUserId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error fetching credits:', error)
      // Return default credits even on database error
      return NextResponse.json({
        totalCredits: 1,
        usedCredits: 0,
        remainingCredits: 1,
        planType: 'free'
      })
    }

    // If no credits record exists, create one with default free plan
    if (!credits) {
      // Try to create credits without remaining_credits column first
      const { data: newCredits, error: createError } = await supabase
        .from('user_credits')
        .insert({
          user_id: finalUserId,
          total_credits: 1, // Free plan gets 1 credit
          used_credits: 0,
          plan_type: 'free'
        })
        .select()
        .single()

      if (createError) {
        console.error('Error creating credits:', createError)
        // If creation fails, return default credits anyway
        return NextResponse.json({
          totalCredits: 1,
          usedCredits: 0,
          remainingCredits: 1,
          planType: 'free'
        })
      }

      return NextResponse.json({
        totalCredits: newCredits.total_credits,
        usedCredits: newCredits.used_credits,
        remainingCredits: newCredits.total_credits - newCredits.used_credits,
        planType: newCredits.plan_type
      })
    }

    return NextResponse.json({
      totalCredits: credits.total_credits || 1,
      usedCredits: credits.used_credits || 0,
      remainingCredits: (credits.total_credits || 1) - (credits.used_credits || 0),
      planType: credits.plan_type || 'free'
    })
  } catch (error) {
    console.error('Credits check error:', error)
    // Return default credits even on error
    return NextResponse.json({
      totalCredits: 1,
      usedCredits: 0,
      remainingCredits: 1,
      planType: 'free'
    })
  }
}
