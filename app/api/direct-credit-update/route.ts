import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { userId, totalCredits, remainingCredits, planType } = await req.json();

    if (!userId || totalCredits === undefined || remainingCredits === undefined || !planType) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin client not initialized' }, { status: 500 });
    }

    console.log('Direct credit update:', {
      userId,
      totalCredits,
      remainingCredits,
      planType
    });

    // Direct update using admin client
    const { data: updatedCredits, error: updateError } = await supabaseAdmin
      .from('user_credits')
      .update({
        total_credits: totalCredits,
        remaining_credits: remainingCredits,
        plan_type: planType,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating credits:', updateError);
      return NextResponse.json({ error: 'Failed to update credits', details: updateError.message }, { status: 500 });
    }

    console.log('Credits updated successfully:', updatedCredits);

    return NextResponse.json({
      success: true,
      message: 'Credits updated successfully',
      credits: updatedCredits
    });

  } catch (error) {
    console.error('Direct credit update error:', error);
    return NextResponse.json({ 
      error: 'Failed to update credits',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
