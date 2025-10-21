import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { user_email } = await request.json();
    
    if (!user_email) {
      return NextResponse.json({ 
        success: false, 
        error: 'User email is required' 
      }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({ 
        success: false, 
        error: 'Database not configured' 
      }, { status: 500 });
    }

    console.log('📖 Loading wizard data from Supabase for user:', user_email);

    // Load data from Supabase
    const { data: wizardData, error } = await supabase
      .from('wizard_data')
      .select('*')
      .eq('user_email', user_email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No data found for this user
        console.log('🆕 No data found for user:', user_email);
        return NextResponse.json({ 
          success: true, 
          message: 'No saved data found for this user',
          data: null 
        });
      } else {
        console.error('❌ Supabase error:', error);
        return NextResponse.json({ 
          success: false, 
          error: 'Failed to load data from database' 
        }, { status: 500 });
      }
    }

    if (wizardData && wizardData.data) {
      console.log('✅ Data loaded from Supabase successfully');
      return NextResponse.json({ 
        success: true, 
        message: 'Wizard data loaded successfully',
        data: wizardData.data 
      });
    } else {
      console.log('🆕 No data found for user:', user_email);
      return NextResponse.json({ 
        success: true, 
        message: 'No saved data found for this user',
        data: null 
      });
    }

  } catch (error) {
    console.error('Error loading wizard data:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to load wizard data' 
    }, { status: 500 });
  }
}
