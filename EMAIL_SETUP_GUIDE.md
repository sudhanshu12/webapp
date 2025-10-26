# Email Verification Setup Guide

## Quick Setup for Production

### 1. Get Resend API Key (Recommended)

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the API key (starts with `re_`)

### 2. Add to Vercel Environment Variables

1. Go to your Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_api_key_here`
   - **Environment**: Production, Preview, Development

### 3. Redeploy

After adding the environment variable, redeploy your application:

```bash
npx vercel --prod --yes
```

## Alternative: SMTP Setup (Fallback)

If you prefer to use SMTP instead of Resend:

### Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Add these environment variables to Vercel:

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = your-16-character-app-password
SMTP_FROM = noreply@createawebsite.click
```

## Testing Email Verification

1. Go to your registration page: `/register`
2. Fill out the registration form
3. Check your email inbox for verification email
4. Click the verification link
5. Try logging in with your credentials

## Troubleshooting

### Email Not Sending
- Check if `RESEND_API_KEY` is set in Vercel
- Verify the API key is valid and active
- Check Vercel function logs for errors

### Verification Link Not Working
- Ensure `NEXTAUTH_URL` is set correctly in Vercel
- Check if the verification token is valid
- Verify the user exists in the database

### Build Failures
- The app will build even without email credentials
- Email services only initialize when actually needed
- Check Vercel build logs for specific errors

## Email Template Customization

The verification email template is located in `/lib/email.ts`. You can customize:

- Email subject line
- HTML template design
- Branding and colors
- Call-to-action buttons
- Footer information

## Security Notes

- Verification tokens expire in 24 hours
- Tokens are cleared after successful verification
- Email addresses are validated before sending
- Rate limiting prevents spam registration attempts

## Support

If you encounter issues:

1. Check Vercel function logs
2. Verify all environment variables are set
3. Test with a simple email address first
4. Contact support if problems persist

---

**Ready to go!** Your users will now receive real verification emails when they register. 🎉
