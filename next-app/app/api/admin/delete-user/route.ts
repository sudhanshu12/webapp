import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    console.log(`🗑️ Deleting user ${userId} from Supabase...`);

    // Delete user and all related data in the correct order (respecting foreign key constraints)
    
    // 1. Delete credit transactions
    await supabase
      .from('credit_transactions')
      .delete()
      .eq('user_id', userId)

    // 2. Delete site creations
    await supabase
      .from('site_creations')
      .delete()
      .eq('user_id', userId)

    // 3. Delete OAuth connections
    await supabase
      .from('oauth_connections')
      .delete()
      .eq('user_id', userId)

    // 4. Delete user credits
    await supabase
      .from('user_credits')
      .delete()
      .eq('user_id', userId)

    // 5. Finally, delete the user
    const { error: userError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId)

    if (userError) {
      console.error('❌ Error deleting user:', userError)
      return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }

    console.log(`✅ Successfully deleted user ${userId} and all related data from Supabase`);

    return NextResponse.json({
      success: true,
      message: 'User and all related data deleted successfully'
    })

  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
