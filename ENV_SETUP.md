# Environment Variables Setup

## For Vercel Deployment

Add these environment variables in **Vercel Dashboard → Settings → Environment Variables**:

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL = https://xuxfcirqocxlfbcqjcpc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eGZjaXJxb2N4bGZiY3FqY3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NjAzMDMsImV4cCI6MjA3NDQzNjMwM30.C9O9Pt-53IfYr54_-czRZ3bQbT4-LI-6anugpdwPowI
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eGZjaXJxb2N4bGZiY3FqY3BjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODg2MDMwMywiZXhwIjoyMDc0NDM2MzAzfQ.nK3bKTv4Ga57w7qwrbW3sx6ttBtmhz1rQlysfDNZnVY
```

### NextAuth Configuration
```
NEXTAUTH_SECRET = 8FkrCryaWi1AWug13XvBFW+kIysm1HTHeW6Ltne/cP0=
NEXTAUTH_URL = https://createawebsite.click
```

### Google OAuth Configuration (for "Sign in with Google")
```
GOOGLE_CLIENT_ID = 884684090277-gs18tm4[...your-full-client-id]
GOOGLE_CLIENT_SECRET = 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
```

**Note:** These credentials are already configured. Make sure they are set in Vercel Dashboard.

### Admin Panel Credentials
```
ADMIN_USERNAME = sudhanshuxmen@gmail.com
ADMIN_PASSWORD = NMR@P@ssw0rd@1234
```

**Note:** These credentials are for accessing the admin panel at `/admin-login`. Store them securely in Vercel environment variables.

### Cashfree Payment Gateway
```
CASHFREE_APP_ID = 11007306a0ee5e16d8e68e2382f0370011
CASHFREE_SECRET_KEY = [your-cashfree-secret-key]
CASHFREE_ENVIRONMENT = PRODUCTION
CASHFREE_WEBHOOK_SECRET = [your-webhook-secret]
```

**Note:** These credentials are already configured. Make sure they are set in Vercel environment variables.

### Lemon Squeezy Payment Gateway (Alternative)
```
LEMON_SQUEEZY_API_KEY = [your-lemon-squeezy-api-key]
LEMON_SQUEEZY_STORE_ID = [your-store-id]
LEMON_SQUEEZY_VARIANT_ID = [your-variant-id]
LEMON_SQUEEZY_WEBHOOK_SECRET = [your-webhook-secret]
```

**Note:** Get these from your Lemon Squeezy dashboard after creating your account and store.

---

## For Local Development

Create a `.env.local` file in the `next-app` directory with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xuxfcirqocxlfbcqjcpc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eGZjaXJxb2N4bGZiY3FqY3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NjAzMDMsImV4cCI6MjA3NDQzNjMwM30.C9O9Pt-53IfYr54_-czRZ3bQbT4-LI-6anugpdwPowI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eGZjaXJxb2N4bGZiY3FqY3BjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODg2MDMwMywiZXhwIjoyMDc0NDM2MzAzfQ.nK3bKTv4Ga57w7qwrbW3sx6ttBtmhz1rQlysfDNZnVY

# NextAuth Configuration
NEXTAUTH_SECRET=8FkrCryaWi1AWug13XvBFW+kIysm1HTHeW6Ltne/cP0=
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional - for "Sign in with Google")
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Admin Panel Credentials
ADMIN_USERNAME=sudhanshuxmen@gmail.com
ADMIN_PASSWORD=NMR@P@ssw0rd@1234
```

---

## Important Notes

### ✅ OpenAI API Key
**No environment variable needed!** Users provide their own OpenAI API key through the wizard form (in the General Settings section). This allows each user to use their own OpenAI account and credits.

### 🔐 Supabase
Your Supabase project is at: https://supabase.com/dashboard/project/xuxfcirqocxlfbcqjcpc

### 🔑 Security
- Never commit `.env.local` to Git (it's already in `.gitignore`)
- The `SUPABASE_SERVICE_ROLE_KEY` is a secret key - keep it secure
- The `NEXTAUTH_SECRET` should be unique and random

# Deployment trigger
