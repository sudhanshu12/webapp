import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'
import * as bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Generate verification token
    const verificationToken = Math.random().toString(36).substring(2, 15) + 
                             Math.random().toString(36).substring(2, 15)

    // Create user in Supabase
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password_hash: passwordHash,
        email_verified: false,
        verification_token: verificationToken,
        provider: 'local'
      })
      .select()
      .single()

    if (userError) {
      console.error('User creation error:', userError)
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Create user credits
    const { error: creditsError } = await supabase
      .from('user_credits')
      .insert({
        user_id: user.id,
        total_credits: 1,
        used_credits: 0,
        plan_type: 'free'
      })

    if (creditsError) {
      console.error('Credits creation error:', creditsError)
      // Don't fail the registration if credits creation fails
    }

    // In a real app, you would send an email here
    console.log(`Verification email would be sent to: ${email}`)
    console.log(`Verification token: ${verificationToken}`)

    return NextResponse.json({
      success: true,
      message: 'User registered successfully. Please check your email for verification.',
      verificationToken: verificationToken // For demo purposes
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
