# 🚀 Complete Supabase Setup Guide

## Step-by-Step Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with your account
3. Click **"New Project"**
4. Fill in project details:
   - **Name**: `credit-system` (or your choice)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup

### 2. Get Your Credentials

Once project is ready:

1. Go to **Settings → API**
2. Copy these values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the entire contents of `supabase-setup.sql`
3. Paste into SQL Editor
4. Click **"Run"**
5. Verify tables were created successfully

### 4. Configure Environment Variables

Create `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Clerk Authentication (if not already configured)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional: Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 5. Test the Setup

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Test the credit system**:
   - Create a new user account
   - Check dashboard shows 1 free credit
   - Try creating a site (should work and deduct 1 credit)
   - Try creating another site (should fail with insufficient credits)
   - Visit billing page and test plan upgrade

### 6. Verify Database

Check your Supabase dashboard:

1. Go to **Table Editor**
2. You should see these tables:
   - `user_credits`
   - `site_creations` 
   - `credit_transactions`

3. Go to **Authentication → Policies**
4. Verify RLS policies are enabled

## 🔧 Troubleshooting

### Common Issues:

**"Invalid API key" error:**
- Double-check your Supabase URL and anon key
- Make sure `.env.local` is in the project root
- Restart your development server

**"Unauthorized" error:**
- Check Clerk configuration
- Verify user is properly authenticated
- Check browser console for auth errors

**Database connection error:**
- Verify Supabase project is active
- Check if database is still initializing
- Try refreshing the Supabase dashboard

**RLS policy errors:**
- Make sure you ran the complete SQL setup
- Check that policies are enabled in Supabase dashboard
- Verify Clerk JWT is being passed correctly

### Debug Steps:

1. **Check browser console** for API errors
2. **Check Supabase logs** in dashboard
3. **Verify environment variables** are loaded
4. **Test API endpoints** directly with Postman/curl

## ✅ Success Indicators

You'll know the setup is working when:

- ✅ Dashboard loads with real credit information
- ✅ New users get 1 free credit automatically  
- ✅ Site creation deducts credits properly
- ✅ Billing page allows plan upgrades
- ✅ Credit history shows in dashboard
- ✅ No console errors in browser
- ✅ Supabase dashboard shows data in tables

## 🚀 Next Steps

Once setup is complete:

1. **Test thoroughly** with multiple user accounts
2. **Set up production environment** with real Supabase project
3. **Configure custom domain** (optional)
4. **Set up monitoring** and error tracking
5. **Deploy to production** when ready

The credit system is now fully integrated with Supabase! 🎉
