import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 });
    }

    // Check if user exists
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, provider, email_verified, created_at')
      .eq('email', email);

    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Check credits for each user
    const usersWithCredits = await Promise.all(
      (users || []).map(async (user) => {
        const { data: credits } = await supabase
          .from('user_credits')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        return {
          ...user,
          credits: credits || null
        };
      })
    );

    return NextResponse.json({
      email,
      count: users?.length || 0,
      users: usersWithCredits
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

