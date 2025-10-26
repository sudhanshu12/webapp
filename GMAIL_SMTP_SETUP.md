# Gmail SMTP Setup for Immediate Email Fix

## Why This is Needed
- Resend domain verification is still in progress
- Users need to receive verification emails now
- Gmail SMTP is reliable and works immediately

## Quick Setup Steps

### 1. Get Gmail App Password
1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification" if not already enabled
3. Click "App passwords" 
4. Select "Mail" as the app
5. Copy the 16-character password (like: `abcd efgh ijkl mnop`)

### 2. Add to Vercel Environment Variables
Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add these variables:
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = your-16-character-app-password
SMTP_FROM = noreply@createawebsite.click
NEXTAUTH_URL = https://createawebsite.click
```

### 3. Redeploy
```bash
npx vercel --prod --yes
```

### 4. Test
After deployment, test:
- Email status: `https://createawebsite.click/api/email-status`
- Test email: `https://createawebsite.click/api/test-email`
- User registration

## What This Does
- ✅ Gmail SMTP works as fallback when Resend fails
- ✅ Users receive verification emails immediately
- ✅ No waiting for DNS propagation
- ✅ Reliable email delivery

## After Resend is Fixed
Once Resend domain verification is complete:
1. Resend will work as primary service
2. Gmail SMTP will remain as fallback
3. Both services will work together

## Current Status
- ❌ Resend: Domain not verified yet
- ❌ SMTP: Not configured
- ✅ System: Ready for SMTP configuration

**This will get emails working in 5 minutes!** 🚀
