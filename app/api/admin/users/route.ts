import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function GET() {
  try {
    console.log('🔍 Fetching users from Supabase...');
    
    // Fetch all users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, created_at')
      .order('created_at', { ascending: false });

    if (usersError) {
      console.error('❌ Error fetching users:', usersError);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    console.log(`✅ Successfully fetched ${users?.length || 0} users from Supabase`);

    // Fetch all user credits
    const { data: credits, error: creditsError } = await supabase
      .from('user_credits')
      .select('user_id, total_credits, used_credits, plan_type');

    if (creditsError) {
      console.error('Error fetching credits:', creditsError);
      return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 });
    }

    // Create a map of user credits
    const userCreditsMap: { [key: string]: any } = {};
    credits?.forEach(credit => {
      userCreditsMap[credit.user_id] = credit;
    });

    return NextResponse.json({
      users: users || [],
      userCredits: userCreditsMap
    });
  } catch (error) {
    console.error('Admin users API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
