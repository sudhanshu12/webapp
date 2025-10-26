-- Complete Payment System Database Setup
-- Run this in your Supabase SQL Editor to ensure all required tables exist

-- 1. Users Table (if not exists)
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  password_hash VARCHAR(255),
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  provider VARCHAR(50) DEFAULT 'local',
  provider_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. User Credits Table (with remaining_credits)
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  total_credits INTEGER NOT NULL DEFAULT 1,
  used_credits INTEGER NOT NULL DEFAULT 0,
  remaining_credits INTEGER NOT NULL DEFAULT 1,
  plan_type TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'starter', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Payment Orders Table (for Cashfree)
CREATE TABLE IF NOT EXISTS payment_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id VARCHAR(255) UNIQUE NOT NULL,
  user_id TEXT NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  package_id VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  status VARCHAR(50) DEFAULT 'PENDING',
  payment_status VARCHAR(50),
  cashfree_order_id VARCHAR(255),
  payment_session_id VARCHAR(255),
  payment_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Pending Purchases Table (for PayPal)
CREATE TABLE IF NOT EXISTS pending_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  package_id TEXT NOT NULL,
  user_email TEXT NOT NULL,
  order_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  transaction_id TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Completed Purchases Table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  package_id TEXT NOT NULL,
  credits_purchased INTEGER NOT NULL,
  amount_paid DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  order_id TEXT NOT NULL UNIQUE,
  transaction_id TEXT,
  payment_method VARCHAR(50) NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Site Creations Table
CREATE TABLE IF NOT EXISTS site_creations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  site_name TEXT NOT NULL,
  credits_used INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'failed')),
  deployment_url TEXT,
  platform TEXT CHECK (platform IN ('wordpress', 'netlify', 'vercel')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Credit Transactions Table
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deduct', 'add', 'purchase', 'admin_adjustment')),
  amount INTEGER NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns to existing tables
DO $$ 
BEGIN
    -- Add remaining_credits to user_credits if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_credits' AND column_name = 'remaining_credits') THEN
        ALTER TABLE user_credits ADD COLUMN remaining_credits INTEGER DEFAULT 1;
    END IF;
    
    -- Update existing records to have remaining_credits = total_credits - used_credits
    UPDATE user_credits 
    SET remaining_credits = total_credits - used_credits
    WHERE remaining_credits IS NULL;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_user_id ON payment_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_order_id ON payment_orders(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_cashfree_order_id ON payment_orders(cashfree_order_id);
CREATE INDEX IF NOT EXISTS idx_pending_purchases_user_id ON pending_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_pending_purchases_order_id ON pending_purchases(order_id);
CREATE INDEX IF NOT EXISTS idx_pending_purchases_status ON pending_purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_order_id ON purchases(order_id);
CREATE INDEX IF NOT EXISTS idx_site_creations_user_id ON site_creations(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
DROP TRIGGER IF EXISTS update_user_credits_updated_at ON user_credits;
CREATE TRIGGER update_user_credits_updated_at 
    BEFORE UPDATE ON user_credits 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payment_orders_updated_at ON payment_orders;
CREATE TRIGGER update_payment_orders_updated_at 
    BEFORE UPDATE ON payment_orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pending_purchases_updated_at ON pending_purchases;
CREATE TRIGGER update_pending_purchases_updated_at 
    BEFORE UPDATE ON pending_purchases 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_purchases_updated_at ON purchases;
CREATE TRIGGER update_purchases_updated_at 
    BEFORE UPDATE ON purchases 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create missing credits for users who don't have any
INSERT INTO user_credits (user_id, total_credits, used_credits, remaining_credits, plan_type, created_at, updated_at)
SELECT 
    u.id::text, 
    1, 
    0, 
    1, 
    'free',
    NOW(),
    NOW()
FROM users u 
LEFT JOIN user_credits uc ON u.id::text = uc.user_id 
WHERE uc.user_id IS NULL;

-- Verify the setup
SELECT 
    'user_credits' as table_name,
    COUNT(*) as record_count
FROM user_credits
UNION ALL
SELECT 
    'payment_orders' as table_name,
    COUNT(*) as record_count
FROM payment_orders
UNION ALL
SELECT 
    'pending_purchases' as table_name,
    COUNT(*) as record_count
FROM pending_purchases
UNION ALL
SELECT 
    'purchases' as table_name,
    COUNT(*) as record_count
FROM purchases;

-- Show sample user credits
SELECT 
    user_id,
    total_credits,
    used_credits,
    remaining_credits,
    plan_type,
    created_at
FROM user_credits
ORDER BY created_at DESC
LIMIT 5;
