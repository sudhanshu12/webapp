import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const emailConfig = {
      resendApiKey: process.env.RESEND_API_KEY ? 'Configured' : 'Not configured',
      smtpUser: process.env.SMTP_USER ? 'Configured' : 'Not configured',
      smtpPass: process.env.SMTP_PASS ? 'Configured' : 'Not configured',
      nextAuthUrl: process.env.NEXTAUTH_URL || 'Not configured',
      environment: process.env.NODE_ENV || 'development'
    }

    return NextResponse.json({
      success: true,
      message: 'Email service configuration status',
      config: emailConfig,
      instructions: {
        resend: 'Get API key from https://resend.com/api-keys',
        smtp: 'Configure SMTP_USER and SMTP_PASS for fallback',
        setup: 'Add environment variables to Vercel Dashboard → Settings → Environment Variables'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check email configuration' },
      { status: 500 }
    )
  }
}
