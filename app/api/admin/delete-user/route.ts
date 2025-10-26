import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    console.log(`🗑️ Deleting user ${userId} from Supabase...`);

    // First, check if the user exists
    const { data: existingUser, error: userCheckError } = await supabase
      .from('users')
      .select('id, email')
      .eq('id', userId)
      .single()

    if (userCheckError || !existingUser) {
      console.error('❌ User not found:', userId)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    console.log(`🗑️ Found user: ${existingUser.email}, proceeding with deletion...`);

    // Delete user and all related data in the correct order (respecting foreign key constraints)
    
    // 1. Delete credit transactions
    const { error: transactionsError } = await supabase
      .from('credit_transactions')
      .delete()
      .eq('user_id', userId)

    if (transactionsError) {
      console.error('❌ Error deleting credit transactions:', transactionsError)
      return NextResponse.json({ error: 'Failed to delete credit transactions' }, { status: 500 })
    }

    // 2. Delete site creations
    const { error: sitesError } = await supabase
      .from('site_creations')
      .delete()
      .eq('user_id', userId)

    if (sitesError) {
      console.error('❌ Error deleting site creations:', sitesError)
      return NextResponse.json({ error: 'Failed to delete site creations' }, { status: 500 })
    }

    // 3. Delete user credits
    const { error: creditsError } = await supabase
      .from('user_credits')
      .delete()
      .eq('user_id', userId)

    if (creditsError) {
      console.error('❌ Error deleting user credits:', creditsError)
      return NextResponse.json({ error: 'Failed to delete user credits' }, { status: 500 })
    }

    // 4. Finally, delete the user (OAuth connections will cascade automatically)
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
