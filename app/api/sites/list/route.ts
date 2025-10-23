import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Check if Supabase environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables not configured');
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const userEmail = request.headers.get('x-user-email');
    const userId = request.headers.get('x-user-id');
    
    if (!userEmail && !userId) {
      return NextResponse.json({ error: 'User email or ID is required' }, { status: 400 });
    }

    let finalUserId = userId;

    // If we have email but not ID, fetch the user ID from email
    if (userEmail && !userId) {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (userError || !user) {
        console.error('Error fetching user by email:', userError);
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      finalUserId = user.id;
    }

    if (!finalUserId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 404 });
    }

    // Fetch sites from the site_creations table
    const { data: sites, error } = await supabase
      .from('site_creations')
      .select('*')
      .eq('user_id', finalUserId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sites:', error);
      return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 });
    }

    return NextResponse.json(sites || []);
  } catch (error) {
    console.error('Error in sites list API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
