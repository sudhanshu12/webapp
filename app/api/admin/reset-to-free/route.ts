import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Reset user to free plan
    const { data: updatedCredits, error: updateError } = await supabase
      .from('user_credits')
      .upsert({
        user_id: userId,
        total_credits: 1, // Free plan gets 1 credit
        used_credits: 0,
        plan_type: 'free',
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single();

    if (updateError) {
      console.error('Error resetting user to free:', updateError);
      return NextResponse.json({ error: 'Failed to reset user to free plan' }, { status: 500 });
    }

    // Record the reset transaction
    const { error: transactionError } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: 'admin_adjustment',
        amount: 0,
        description: 'Admin reset user to Free plan'
      });

    if (transactionError) {
      console.error('Error recording reset transaction:', transactionError);
      // Don't fail the request for this, just log it
    }

    return NextResponse.json({
      success: true,
      message: 'User successfully reset to Free plan',
      newPlanType: 'free',
      totalCredits: 1,
      usedCredits: 0
    });
  } catch (error) {
    console.error('Admin reset to free error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
