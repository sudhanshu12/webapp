import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function GET() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Test basic connection by fetching user count
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Supabase connection error:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Supabase connection failed',
        details: error.message 
      }, { status: 500 });
    }

    console.log(`✅ Supabase connection successful! Found ${count} users in database.`);

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      userCount: count,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Connection test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Connection test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
