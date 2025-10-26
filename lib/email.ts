import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailVerificationData {
  email: string;
  firstName: string;
  lastName: string;
  verificationToken: string;
}

export async function sendVerificationEmail(data: EmailVerificationData) {
  try {
    const verificationUrl = `${process.env.NEXTAUTH_URL || 'https://createawebsite.click'}/verify-email?token=${data.verificationToken}&email=${encodeURIComponent(data.email)}`;
    
    const { data: emailData, error } = await resend.emails.send({
      from: 'Create A Website Click <noreply@createawebsite.click>',
      to: [data.email],
      subject: 'Verify Your Email Address - Create A Website Click',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background: white;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #4C1D95;
              margin-bottom: 10px;
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 10px;
            }
            .subtitle {
              color: #6b7280;
              font-size: 16px;
            }
            .content {
              margin-bottom: 30px;
            }
            .greeting {
              font-size: 18px;
              margin-bottom: 20px;
            }
            .message {
              font-size: 16px;
              margin-bottom: 30px;
              color: #374151;
            }
            .button {
              display: inline-block;
              background: #4C1D95;
              color: white;
              padding: 16px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              text-align: center;
              margin: 20px 0;
            }
            .button:hover {
              background: #3B1A7A;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              font-size: 14px;
              color: #6b7280;
              text-align: center;
            }
            .warning {
              background: #fef3c7;
              border: 1px solid #f59e0b;
              border-radius: 8px;
              padding: 16px;
              margin: 20px 0;
              color: #92400e;
            }
            .link {
              color: #4C1D95;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Create A Website Click</div>
              <h1 class="title">Verify Your Email Address</h1>
              <p class="subtitle">Complete your account registration</p>
            </div>
            
            <div class="content">
              <p class="greeting">Hello ${data.firstName} ${data.lastName},</p>
              
              <p class="message">
                Thank you for registering with Create A Website Click! To complete your account setup and start building amazing websites, please verify your email address by clicking the button below.
              </p>
              
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              
              <p class="message">
                If the button doesn't work, you can also copy and paste this link into your browser:
              </p>
              
              <p style="word-break: break-all; background: #f3f4f6; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 14px;">
                <a href="${verificationUrl}" class="link">${verificationUrl}</a>
              </p>
              
              <div class="warning">
                <strong>Important:</strong> This verification link will expire in 24 hours for security reasons. If you don't verify your email within this time, you'll need to register again.
              </div>
              
              <p class="message">
                Once verified, you'll be able to:
              </p>
              <ul style="color: #374151;">
                <li>Access your dashboard</li>
                <li>Create professional websites</li>
                <li>Manage your projects</li>
                <li>Get support from our team</li>
              </ul>
            </div>
            
            <div class="footer">
              <p>If you didn't create an account with Create A Website Click, please ignore this email.</p>
              <p>This email was sent to ${data.email}</p>
              <p>&copy; 2025 Create A Website Click. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Email sending error:', error);
      throw new Error('Failed to send verification email');
    }

    console.log('Verification email sent successfully:', emailData);
    return { success: true, messageId: emailData?.id };
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}

// Fallback email service using Nodemailer (if Resend fails)
export async function sendVerificationEmailFallback(data: EmailVerificationData) {
  try {
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const verificationUrl = `${process.env.NEXTAUTH_URL || 'https://createawebsite.click'}/verify-email?token=${data.verificationToken}&email=${encodeURIComponent(data.email)}`;

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@createawebsite.click',
      to: data.email,
      subject: 'Verify Your Email Address - Create A Website Click',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4C1D95;">Verify Your Email Address</h2>
          <p>Hello ${data.firstName} ${data.lastName},</p>
          <p>Thank you for registering with Create A Website Click! Please verify your email address by clicking the link below:</p>
          <a href="${verificationUrl}" style="background: #4C1D95; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Verify Email</a>
          <p>If the button doesn't work, copy and paste this link: ${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br>The Create A Website Click Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Fallback email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Fallback email service error:', error);
    throw error;
  }
}
