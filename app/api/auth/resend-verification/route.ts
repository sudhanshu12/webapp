import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'
import { sendVerificationEmail, sendVerificationEmailFallback } from '../../../../lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Find user by email
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'No account found with this email address' },
        { status: 404 }
      )
    }

    // Check if user is already verified
    if (user.email_verified) {
      return NextResponse.json(
        { error: 'This email address is already verified' },
        { status: 400 }
      )
    }

    // Generate new verification token
    const verificationToken = Math.random().toString(36).substring(2, 15) + 
                             Math.random().toString(36).substring(2, 15)

    // Update user with new verification token
    const { error: updateError } = await supabase
      .from('users')
      .update({ verification_token: verificationToken })
      .eq('id', user.id)

    if (updateError) {
      console.error('Token update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to generate new verification token' },
        { status: 500 }
      )
    }

    // Send verification email
    try {
      await sendVerificationEmail({
        email: email,
        firstName: user.first_name,
        lastName: user.last_name,
        verificationToken: verificationToken
      })
      
      console.log(`Resend verification email sent successfully to: ${email}`)
    } catch (emailError) {
      console.error('Primary email service failed, trying fallback:', emailError)
      
      // Try fallback email service
      try {
        await sendVerificationEmailFallback({
          email: email,
          firstName: user.first_name,
          lastName: user.last_name,
          verificationToken: verificationToken
        })
        
        console.log(`Fallback resend verification email sent successfully to: ${email}`)
      } catch (fallbackError) {
        console.error('Both email services failed:', fallbackError)
        return NextResponse.json(
          { error: 'Failed to send verification email. Please try again later.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully. Please check your inbox.'
    })

  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
