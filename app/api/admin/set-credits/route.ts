import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { userId, totalCredits, usedCredits, remainingCredits, planType } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    console.log('Setting user credits:', {
      userId,
      totalCredits,
      usedCredits,
      remainingCredits,
      planType
    });

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin client not initialized' }, { status: 500 });
    }

    // Update user credits directly
    const { data: updatedCredits, error: updateError } = await supabaseAdmin
      .from('user_credits')
      .update({
        total_credits: totalCredits || 30,
        used_credits: usedCredits || 0,
        remaining_credits: remainingCredits || 30,
        plan_type: planType || 'pro',
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating user credits:', updateError);
      return NextResponse.json({ error: 'Failed to update user credits' }, { status: 500 });
    }

    console.log('User credits updated successfully:', updatedCredits);

    return NextResponse.json({
      success: true,
      message: 'User credits set successfully',
      credits: updatedCredits
    });

  } catch (error) {
    console.error('Set credits error:', error);
    return NextResponse.json({ 
      error: 'Failed to set credits',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
