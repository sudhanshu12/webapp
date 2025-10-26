import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Test Resend directly
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    console.log('Testing Resend API directly...')
    console.log('API Key exists:', !!process.env.RESEND_API_KEY)
    console.log('API Key length:', process.env.RESEND_API_KEY?.length)
    console.log('API Key starts with:', process.env.RESEND_API_KEY?.substring(0, 5))

    const { data, error } = await resend.emails.send({
      from: 'Create A Website Click <noreply@start.createawebsite.click>',
      to: [email],
      subject: 'Resend API Test - Create A Website Click',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4C1D95;">Resend API Test</h2>
          <p>This is a test email to verify that Resend is working correctly with the verified domain.</p>
          <p>If you receive this email, the Resend API is working properly!</p>
          <p>Sent at: ${new Date().toISOString()}</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend API Error:', error)
      return NextResponse.json({
        success: false,
        message: 'Resend API failed',
        error: error.message || 'Unknown error',
        errorDetails: error
      })
    }

    console.log('Resend API Success:', data)
    return NextResponse.json({
      success: true,
      message: 'Resend API test successful!',
      messageId: data?.id,
      emailSent: true
    })

  } catch (error) {
    console.error('Resend API Test Error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Resend API test failed', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}
