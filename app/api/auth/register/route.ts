import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'
import * as bcrypt from 'bcryptjs'
import { sendVerificationEmail, sendVerificationEmailFallback } from '../../../../lib/email'

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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
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

    // Send verification email
    let emailSent = false;
    let emailError = null;
    
    try {
      console.log('Attempting to send verification email to:', email);
      console.log('Resend API key configured:', !!process.env.RESEND_API_KEY);
      console.log('SMTP credentials configured:', !!(process.env.SMTP_USER && process.env.SMTP_PASS));
      
      await sendVerificationEmail({
        email: email,
        firstName: firstName,
        lastName: lastName,
        verificationToken: verificationToken
      })
      
      console.log(`Verification email sent successfully to: ${email}`)
      emailSent = true;
    } catch (emailError) {
      console.error('Primary email service failed:', emailError)
      
      // Try fallback email service
      try {
        console.log('Attempting fallback SMTP email service...');
        await sendVerificationEmailFallback({
          email: email,
          firstName: firstName,
          lastName: lastName,
          verificationToken: verificationToken
        })
        
        console.log(`Fallback verification email sent successfully to: ${email}`)
        emailSent = true;
      } catch (fallbackError) {
        console.error('Both email services failed:', fallbackError)
        emailError = fallbackError;
        // Don't fail registration if email sending fails
        // User can still verify manually or resend email
      }
    }

    return NextResponse.json({
      success: true,
      message: emailSent 
        ? 'User registered successfully. Please check your email for verification instructions.'
        : 'User registered successfully, but email verification could not be sent. Please contact support.',
      emailSent: emailSent,
      emailError: emailError ? emailError.message : null
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
