import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get session using NextAuth
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({
        authenticated: false,
        message: 'No session found'
      });
    }

    // Check how many users exist with this email
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, provider, created_at')
      .eq('email', session.user.email);

    if (error) {
      return NextResponse.json({
        authenticated: true,
        session: session.user,
        error: error.message
      });
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
      authenticated: true,
      session: session.user,
      userCount: users?.length || 0,
      users: usersWithCredits,
      warning: users && users.length > 1 ? '⚠️ DUPLICATE USERS DETECTED!' : null
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Internal server error',
      details: String(error)
    }, { status: 500 });
  }
}

