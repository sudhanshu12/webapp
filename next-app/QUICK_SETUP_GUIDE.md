# 🚀 Quick Supabase Setup Guide

## Your Supabase Credentials:
- **URL**: https://xuxfcirqocxlfbcqjcpc.supabase.co
- **Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eGZjaXJxb2N4bGZiY3FqY3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NjAzMDMsImV4cCI6MjA3NDQzNjMwM30.C9O9Pt-53IfYr54_-czRZ3bQbT4-LI-6anugpdwPowI

## Step 1: Create Environment File

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xuxfcirqocxlfbcqjcpc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eGZjaXJxb2N4bGZiY3FqY3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NjAzMDMsImV4cCI6MjA3NDQzNjMwM30.C9O9Pt-53IfYr54_-czRZ3bQbT4-LI-6anugpdwPowI
```

## Step 2: Set Up Database Schema

1. **Go to**: https://supabase.com/dashboard
2. **Click on your project** (xuxfcirqocxlfbcqjcpc)
3. **Go to SQL Editor** (left sidebar)
4. **Copy and paste this SQL**:

```sql
-- User Credits Table
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  total_credits INTEGER NOT NULL DEFAULT 1,
  used_credits INTEGER NOT NULL DEFAULT 0,
  plan_type TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Creations Table
CREATE TABLE IF NOT EXISTS site_creations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  site_name TEXT NOT NULL,
  credits_used INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit Transactions Table
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deduct', 'add', 'purchase')),
  amount INTEGER NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_site_creations_user_id ON site_creations(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);

-- Row Level Security
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- Policies (simplified for now)
CREATE POLICY "Enable all operations for authenticated users" ON user_credits FOR ALL USING (true);
CREATE POLICY "Enable all operations for authenticated users" ON site_creations FOR ALL USING (true);
CREATE POLICY "Enable all operations for authenticated users" ON credit_transactions FOR ALL USING (true);
```

5. **Click "Run"** to execute
6. **Verify success** - you should see "Success" message

## Step 3: Test the Setup

Run the test script:
```bash
node test-supabase-simple.js
```

You should see:
```
✅ Supabase connection successful!
✅ Database schema is properly set up!
🎉 Setup is working correctly!
```

## Step 4: Start Your App

```bash
npm run dev
```

## Step 5: Test the Credit System

1. **Open your app** in browser
2. **Create a user account** (if not already done)
3. **Go to dashboard** - should show 1 free credit
4. **Try creating a site** - should work and deduct 1 credit
5. **Try creating another site** - should fail with insufficient credits message

## Troubleshooting

**If you get "relation does not exist" error:**
- Make sure you ran the SQL in Supabase dashboard
- Check that you're in the correct project
- Verify the SQL executed successfully

**If you get "Unauthorized" error:**
- Check your Clerk configuration
- Make sure user is properly authenticated

**If you get connection errors:**
- Verify your .env.local file is in the project root
- Check that the Supabase URL and key are correct
- Restart your development server

## Success Indicators

✅ Database tables created  
✅ Environment variables set  
✅ Connection test passes  
✅ Dashboard shows real credit data  
✅ Site creation deducts credits  
✅ Billing page allows upgrades  

Once all these work, your credit system is fully operational! 🎉
