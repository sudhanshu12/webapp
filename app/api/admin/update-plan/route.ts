import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { userId, planType } = await request.json();

    if (!userId || !planType) {
      return NextResponse.json({ error: 'User ID and Plan Type are required' }, { status: 400 });
    }

    console.log('Updating user plan type:', { userId, planType });

    // Update user plan type
    const { data: updatedUser, error: updateError } = await supabase
      .from('user_credits')
      .update({
        plan_type: planType,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating plan type:', updateError);
      return NextResponse.json({ error: 'Failed to update plan type' }, { status: 500 });
    }

    console.log('Successfully updated plan type:', updatedUser);

    return NextResponse.json({
      success: true,
      message: `Successfully updated plan type to ${planType}`,
      user: updatedUser
    });

  } catch (error) {
    console.error('Update plan type error:', error);
    return NextResponse.json({ 
      error: 'Failed to update plan type',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
