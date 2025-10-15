import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    // Fetch user details by email
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, provider, email_verified, created_at')
      .eq('email', email)
      .single();

    if (userError || !user) {
      console.error('Error fetching user details:', userError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      provider: user.provider,
      email_verified: user.email_verified,
      created_at: user.created_at
    });

  } catch (error) {
    console.error('User details fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

