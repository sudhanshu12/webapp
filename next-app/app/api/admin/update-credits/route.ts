import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userId, amount, operation } = await request.json();

    if (!userId || !amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    // Get current user credits
    const { data: currentCredits, error: fetchError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching credits:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch user credits' }, { status: 500 });
    }

    // Calculate new total credits
    let newTotalCredits = amount;
    if (currentCredits) {
      if (operation === 'add') {
        newTotalCredits = currentCredits.total_credits + amount;
      } else {
        newTotalCredits = Math.max(0, currentCredits.total_credits - amount);
      }
    }

    // Update or create user credits
    const { data: updatedCredits, error: updateError } = await supabase
      .from('user_credits')
      .upsert({
        user_id: userId,
        total_credits: newTotalCredits,
        used_credits: currentCredits?.used_credits || 0,
        plan_type: currentCredits?.plan_type || 'free',
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single();

    if (updateError) {
      console.error('Error updating credits:', updateError);
      return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 });
    }

    // Record credit transaction
    const { error: transactionError } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: 'admin_adjustment',
        amount: operation === 'add' ? amount : -amount,
        description: `Admin ${operation}: ${amount} credits`
      });

    if (transactionError) {
      console.error('Error recording transaction:', transactionError);
      // Don't fail the request for this, just log it
    }

    return NextResponse.json({
      success: true,
      message: `Successfully ${operation === 'add' ? 'added' : 'removed'} ${amount} credits`,
      newTotalCredits: updatedCredits.total_credits,
      operation: operation,
      amount: amount
    });
  } catch (error) {
    console.error('Admin update credits error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
