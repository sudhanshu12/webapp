import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// This endpoint creates missing credits for users who don't have them
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Get user by email
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if credits already exist
    const { data: existingCredits } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existingCredits) {
      return NextResponse.json({
        message: 'Credits already exist',
        credits: existingCredits
      });
    }

    // Create credits (without remaining_credits if column doesn't exist)
    const { data: newCredits, error: creditsError } = await supabase
      .from('user_credits')
      .insert([
        {
          user_id: user.id,
          total_credits: 1,
          used_credits: 0,
          plan_type: 'free',
        }
      ])
      .select()
      .single();

    if (creditsError) {
      console.error('Error creating credits:', creditsError);
      return NextResponse.json({ error: creditsError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Credits created successfully',
      credits: {
        totalCredits: newCredits.total_credits,
        usedCredits: newCredits.used_credits,
        remainingCredits: newCredits.total_credits - newCredits.used_credits,
        planType: newCredits.plan_type
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

