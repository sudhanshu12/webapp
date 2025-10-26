# Quick Email Fix Instructions

## Current Status
- ✅ Domain verified in Resend
- ❌ Resend still failing (needs debugging)
- ❌ No SMTP fallback configured
- ❌ Wrong NEXTAUTH_URL

## Immediate Fix: Set Up Gmail SMTP Fallback

### Step 1: Get Gmail App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. Go to "App passwords" section
4. Generate a new app password for "Mail"
5. Copy the 16-character password (like: `abcd efgh ijkl mnop`)

### Step 2: Add to Vercel Environment Variables
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add these variables:

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = your-16-character-app-password
SMTP_FROM = noreply@createawebsite.click
NEXTAUTH_URL = https://createawebsite.click
```

### Step 3: Redeploy
```bash
npx vercel --prod --yes
```

## Test After Setup
1. Test email status: `https://createawebsite.click/api/email-status`
2. Test email sending: `https://createawebsite.click/api/test-email`
3. Try user registration

## Why This Works
- Gmail SMTP is reliable and free
- Works as fallback when Resend fails
- Immediate solution while debugging Resend
- Users will receive verification emails right away

## Next Steps (Optional)
- Debug Resend API key after domain verification
- Check if API key needs to be regenerated
- Verify DNS records are properly set
