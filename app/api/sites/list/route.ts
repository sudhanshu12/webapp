import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch sites from the site_creations table
    const { data: sites, error } = await supabase
      .from('site_creations')
      .select('*')
      .eq('user_id', userId)
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
