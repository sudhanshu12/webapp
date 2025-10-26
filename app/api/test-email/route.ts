import { NextRequest, NextResponse } from 'next/server'
import { sendVerificationEmail, sendVerificationEmailFallback } from '../../../../lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json()

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Email, firstName, and lastName are required' },
        { status: 400 }
      )
    }

    // Generate a test verification token
    const verificationToken = 'test_' + Math.random().toString(36).substring(2, 15)

    console.log('Testing email service with:', { email, firstName, lastName })
    console.log('Resend API key configured:', !!process.env.RESEND_API_KEY)
    console.log('SMTP credentials configured:', !!(process.env.SMTP_USER && process.env.SMTP_PASS))

    let emailSent = false;
    let emailError = null;

    // Try primary email service
    try {
      await sendVerificationEmail({
        email: email,
        firstName: firstName,
        lastName: lastName,
        verificationToken: verificationToken
      })
      
      console.log('Test email sent successfully via Resend')
      emailSent = true;
    } catch (error) {
      console.error('Resend failed:', error)
      emailError = error;

      // Try fallback
      try {
        await sendVerificationEmailFallback({
          email: email,
          firstName: firstName,
          lastName: lastName,
          verificationToken: verificationToken
        })
        
        console.log('Test email sent successfully via SMTP')
        emailSent = true;
        emailError = null;
      } catch (fallbackError) {
        console.error('SMTP also failed:', fallbackError)
        emailError = fallbackError;
      }
    }

    return NextResponse.json({
      success: emailSent,
      message: emailSent 
        ? 'Test email sent successfully! Check your inbox.'
        : 'Failed to send test email. Check configuration.',
      emailSent: emailSent,
      error: emailError ? emailError.message : null,
      config: {
        resendConfigured: !!process.env.RESEND_API_KEY,
        smtpConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
        nextAuthUrl: process.env.NEXTAUTH_URL
      }
    })

  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
