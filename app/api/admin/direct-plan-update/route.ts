import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { userId, planType } = await request.json();

    if (!userId || !planType) {
      return NextResponse.json({ error: 'User ID and plan type are required' }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin client not initialized' }, { status: 500 });
    }

    console.log('Direct plan update:', { userId, planType });

    // First check if user exists
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (checkError) {
      console.error('Error checking user:', checkError);
      return NextResponse.json({ error: 'User not found', details: checkError.message }, { status: 404 });
    }

    console.log('Existing user data:', existingUser);

    // Update plan type and remaining credits
    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('user_credits')
      .update({
        plan_type: planType,
        remaining_credits: existingUser.total_credits - existingUser.used_credits,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating user:', updateError);
      return NextResponse.json({ error: 'Failed to update user', details: updateError.message }, { status: 500 });
    }

    console.log('Successfully updated user:', updatedUser);

    return NextResponse.json({
      success: true,
      message: `Successfully updated plan type to ${planType}`,
      user: updatedUser
    });

  } catch (error) {
    console.error('Direct plan update error:', error);
    return NextResponse.json({ 
      error: 'Failed to update plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
