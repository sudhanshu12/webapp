# Google OAuth Redirect Fix - Testing Guide

## ✅ **What I Fixed:**

1. **Improved Error Handling**
   - Better error checking in `signIn` callback
   - Ignores non-critical Postgres errors (PGRST116 = no rows)
   - Added comprehensive logging throughout

2. **Enhanced Redirect Logic**
   - Explicit error URL detection
   - Better URL handling for different scenarios
   - Always defaults to `/dashboard` on success

3. **Better Session Management**
   - Enriches session with user data from Supabase
   - Handles errors gracefully without blocking

---

## 🧪 **How to Test (After Deployment - 2-3 minutes)**

### **Step 1: Clear Browser Data**
Before testing, clear your browser:
1. Open Chrome DevTools (F12)
2. Go to **Application** tab
3. Click **Clear site data**
4. Or use Incognito mode

### **Step 2: Test Google OAuth**
1. Visit: https://createawebsite.click/register
2. Click **"Continue with Google"**
3. Select your Google account
4. **Expected:** Should redirect to `/dashboard`

### **Step 3: Check Console Logs**
Open browser console (F12) and look for these logs:
```
Google sign-in attempt for: [your-email]
Creating new user: [your-email]  (or "Existing user found")
User created successfully, adding credits
Credits created successfully
Sign-in callback returning true
Redirect callback - url: [...] baseUrl: [...]
Redirecting to dashboard
```

### **Step 4: Check Vercel Logs**
If it still doesn't work, check Vercel logs:
1. Go to Vercel Dashboard
2. Select your project
3. Click **"Logs"** or **"Functions"**
4. Look for errors in the `/api/auth/callback/google` function

---

## 🔍 **Common Issues & Solutions**

### **Issue 1: Still Shows "Try signing in with a different account"**

**Possible Causes:**
- Database connection issue
- Supabase credentials not set in Vercel
- User table doesn't exist

**Solution:**
Check Vercel environment variables:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

### **Issue 2: Redirects to `/api/auth/signin?error=OAuthCallback`**

**Possible Causes:**
- Google OAuth credentials incorrect
- Callback URL not authorized in Google Console

**Solution:**
1. Check Google Cloud Console: https://console.cloud.google.com/apis/credentials
2. Verify **Authorized redirect URIs** includes:
   ```
   https://createawebsite.click/api/auth/callback/google
   ```
3. Check Vercel environment variables:
   ```
   GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET
   NEXTAUTH_URL = https://createawebsite.click
   NEXTAUTH_SECRET
   ```

### **Issue 3: Redirects but dashboard is blank**

**Possible Causes:**
- Session not being created properly
- Dashboard page has an error

**Solution:**
1. Check browser console for errors
2. Verify session by visiting: https://createawebsite.click/api/auth/session
3. Should return JSON with user data

---

## 🛠️ **Debug Commands**

### **Check Session Status**
Visit in browser:
```
https://createawebsite.click/api/auth/session
```

Expected response (logged in):
```json
{
  "user": {
    "name": "Your Name",
    "email": "your@email.com",
    "image": "...",
    "id": "user-id-from-supabase"
  },
  "expires": "..."
}
```

### **Check Environment Variables**
Visit in browser:
```
https://createawebsite.click/api/env-check
```

Should show:
```json
{
  "hasGoogleClientId": true,
  "googleClientIdLength": 72,
  "hasGoogleClientSecret": true,
  "googleClientSecretLength": 35,
  "hasNextAuthUrl": true,
  "nextAuthUrl": "https://createawebsite.click",
  "hasNextAuthSecret": true
}
```

---

## 📋 **Checklist**

Before reporting issues, verify:

- [ ] Cleared browser cache/cookies or using Incognito
- [ ] Google Safe Browsing warning is gone
- [ ] Waited 2-3 minutes after deployment
- [ ] Checked Vercel logs for errors
- [ ] Verified environment variables in Vercel
- [ ] Checked Google Cloud Console redirect URIs
- [ ] Tested `/api/auth/session` endpoint
- [ ] Checked browser console for JavaScript errors

---

## 🎯 **Expected Flow**

1. User clicks "Continue with Google"
2. Redirects to Google sign-in
3. User selects account
4. Google redirects to: `https://createawebsite.click/api/auth/callback/google?code=...`
5. NextAuth processes the callback:
   - Exchanges code for tokens
   - Calls `signIn` callback
   - Creates/fetches user in Supabase
   - Creates session
   - Calls `redirect` callback
6. User lands on: `https://createawebsite.click/dashboard`

---

## 📞 **If Still Not Working**

Share these details:
1. **Browser console logs** (full output)
2. **Vercel function logs** (from dashboard)
3. **Response from** `/api/auth/session`
4. **Response from** `/api/env-check`
5. **Screenshot** of the error page

---

**Last Updated:** October 10, 2025
**Status:** Deployed - Ready for testing

