# Quick Cashfree Setup

## Step 1: Get Cashfree Credentials

1. **Go to Cashfree**: https://www.cashfree.com/
2. **Sign up** for a free account
3. **Login** to your dashboard
4. **Go to**: Developers → API Keys
5. **Copy your Secret Key** (starts with `cfsk_`)

## Step 2: Add to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**
3. **Go to**: Settings → Environment Variables
4. **Add these variables**:

```
CASHFREE_APP_ID = 11007306a0ee5e16d8e68e2382f0370011
CASHFREE_SECRET_KEY = your_secret_key_from_cashfree
CASHFREE_ENVIRONMENT = SANDBOX
```

## Step 3: Test

1. **Redeploy** your app (Vercel will auto-deploy)
2. **Visit**: `/api/env-check` to verify credentials
3. **Test payment** on billing page

## Current Status

✅ App ID already configured  
❌ Secret Key needs to be added  
❌ Environment needs to be set  

## Quick Test

After adding credentials, visit:
- `/api/env-check` - Check if credentials are loaded
- `/api/payments/cashfree/test-credentials` - Test Cashfree connection

## Expected Result

Once configured, you should see:
- ✅ `hasCashfreeSecretKey: true`
- ✅ `cashfreeConfigured: true`
- ✅ Payment should work on billing page
