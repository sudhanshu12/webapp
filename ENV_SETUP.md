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
NEXTAUTH_URL = https://your-app.vercel.app
```

**Important:** Update `NEXTAUTH_URL` with your actual Vercel deployment URL after first deploy.

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
