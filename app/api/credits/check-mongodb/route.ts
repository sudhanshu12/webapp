import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, COLLECTIONS } from '@/lib/mongodb'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    // Get user's credit information
    const credits = await db.collection(COLLECTIONS.USER_CREDITS).findOne({ user_id: userId })

    // If no credits record exists, create one with default free plan
    if (!credits) {
      const newCredits = {
        user_id: userId,
        total_credits: 1, // Free plan gets 1 credit
        used_credits: 0,
        plan_type: 'free',
        created_at: new Date(),
        updated_at: new Date()
      }

      await db.collection(COLLECTIONS.USER_CREDITS).insertOne(newCredits)

      return NextResponse.json({
        totalCredits: newCredits.total_credits,
        usedCredits: newCredits.used_credits,
        remainingCredits: newCredits.total_credits - newCredits.used_credits,
        planType: newCredits.plan_type
      })
    }

    return NextResponse.json({
      totalCredits: credits.total_credits,
      usedCredits: credits.used_credits,
      remainingCredits: credits.total_credits - credits.used_credits,
      planType: credits.plan_type
    })
  } catch (error) {
    console.error('Credits check error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
