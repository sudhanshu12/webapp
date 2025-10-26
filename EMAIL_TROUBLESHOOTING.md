# Email Service Setup Instructions

## Current Issue: Emails Not Sending

The email verification system is failing because:

1. **Resend API Key Issue**: The Resend API key might be invalid or the domain `createawebsite.click` is not verified in Resend
2. **Wrong NEXTAUTH_URL**: Currently set to `https://webapp-git-main-sudhanshu12.vercel.app` instead of `https://createawebsite.click`
3. **No SMTP Fallback**: SMTP credentials are not configured

## Quick Fix Options

### Option 1: Fix Resend (Recommended)

1. **Go to Resend Dashboard**: https://resend.com/domains
2. **Add Domain**: Add `createawebsite.click` to your Resend account
3. **Verify Domain**: Follow DNS verification steps
4. **Update API Key**: Make sure you're using the correct API key

### Option 2: Set Up Gmail SMTP Fallback (Quick Fix)

1. **Enable 2FA on Gmail**: Go to Google Account → Security → 2-Step Verification
2. **Generate App Password**: 
   - Go to Google Account → Security → App passwords
   - Generate password for "Mail"
3. **Add to Vercel Environment Variables**:
   ```
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USER = your-email@gmail.com
   SMTP_PASS = your-16-character-app-password
   SMTP_FROM = noreply@createawebsite.click
   ```

### Option 3: Fix NEXTAUTH_URL

Update the `NEXTAUTH_URL` environment variable in Vercel to:
```
NEXTAUTH_URL = https://createawebsite.click
```

## Testing

After making changes:

1. **Test Email Status**: `https://createawebsite.click/api/email-status`
2. **Test Email Sending**: `https://createawebsite.click/api/test-email`
3. **Test Registration**: Try registering a new user

## Debugging

Check Vercel function logs for detailed error messages:
- Go to Vercel Dashboard → Functions → View Logs
- Look for "Resend email sending error" or "SMTP" errors

## Current Configuration Status

- ✅ **Resend API Key**: Configured
- ❌ **SMTP Credentials**: Not configured  
- ❌ **NEXTAUTH_URL**: Wrong domain
- ❌ **Domain Verification**: Likely not verified in Resend

## Next Steps

1. **Immediate**: Set up Gmail SMTP fallback (Option 2)
2. **Long-term**: Fix Resend domain verification (Option 1)
3. **Update**: Fix NEXTAUTH_URL (Option 3)
