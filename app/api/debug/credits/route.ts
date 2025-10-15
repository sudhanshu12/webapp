import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    console.log('🔍 Debugging credits for email:', email);

    // 1. Check if user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, provider, created_at')
      .eq('email', email)
      .single();

    if (userError) {
      console.error('❌ User not found:', userError);
      return NextResponse.json({ 
        error: 'User not found', 
        details: userError.message,
        email 
      }, { status: 404 });
    }

    console.log('✅ User found:', user);

    // 2. Check if credits exist
    const { data: credits, error: creditsError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (creditsError) {
      console.error('❌ Error fetching credits:', creditsError);
      return NextResponse.json({ 
        error: 'Failed to fetch credits', 
        details: creditsError.message,
        user 
      }, { status: 500 });
    }

    console.log('📊 Credits data:', credits);

    // 3. If no credits, try to create them
    if (!credits) {
      console.log('⚠️ No credits found, creating them...');
      
      const { data: newCredits, error: createError } = await supabase
        .from('user_credits')
        .insert({
          user_id: user.id,
          total_credits: 1,
          used_credits: 0,
          remaining_credits: 1,
          plan_type: 'free'
        })
        .select()
        .single();

      if (createError) {
        console.error('❌ Error creating credits:', createError);
        return NextResponse.json({ 
          error: 'Failed to create credits', 
          details: createError.message,
          user 
        }, { status: 500 });
      }

      console.log('✅ Credits created successfully:', newCredits);
      
      return NextResponse.json({
        success: true,
        message: 'Credits created successfully',
        user,
        credits: {
          totalCredits: newCredits.total_credits,
          usedCredits: newCredits.used_credits,
          remainingCredits: newCredits.total_credits - newCredits.used_credits,
          planType: newCredits.plan_type
        },
        action: 'created'
      });
    }

    // 4. Return existing credits
    console.log('✅ Credits found:', credits);
    
    return NextResponse.json({
      success: true,
      message: 'Credits found',
      user,
      credits: {
        totalCredits: credits.total_credits,
        usedCredits: credits.used_credits,
        remainingCredits: credits.total_credits - credits.used_credits,
        planType: credits.plan_type
      },
      action: 'found'
    });

  } catch (error) {
    console.error('❌ Debug credits error:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
