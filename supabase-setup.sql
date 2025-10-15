-- Supabase Credit System Setup
-- Run this in your Supabase SQL Editor

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  password_hash VARCHAR(255), -- For local auth users
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  provider VARCHAR(50) DEFAULT 'local', -- 'local', 'google', etc.
  provider_id VARCHAR(255), -- External provider user ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Credits Table
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_credits INTEGER NOT NULL DEFAULT 1,
  used_credits INTEGER NOT NULL DEFAULT 0,
  plan_type TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Site Creations Table
CREATE TABLE IF NOT EXISTS site_creations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  site_name TEXT NOT NULL,
  credits_used INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'failed')),
  deployment_url TEXT,
  platform TEXT CHECK (platform IN ('wordpress', 'netlify', 'vercel')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit Transactions Table
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('deduct', 'add', 'purchase', 'admin_adjustment')),
  amount INTEGER NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- OAuth Connections Table
CREATE TABLE IF NOT EXISTS oauth_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('netlify', 'vercel')),
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  platform_user_id TEXT,
  platform_username TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_site_creations_user_id ON site_creations(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_oauth_connections_user_id ON oauth_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_site_creations_created_at ON site_creations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON credit_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_oauth_connections_platform ON oauth_connections(platform);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Update existing constraint to allow admin_adjustment
ALTER TABLE credit_transactions DROP CONSTRAINT IF EXISTS credit_transactions_type_check;
ALTER TABLE credit_transactions ADD CONSTRAINT credit_transactions_type_check CHECK (type IN ('deduct', 'add', 'purchase', 'admin_adjustment'));

-- Drop existing triggers if they exist, then create new ones
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_user_credits_updated_at ON user_credits;
DROP TRIGGER IF EXISTS update_oauth_connections_updated_at ON oauth_connections;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_credits_updated_at 
    BEFORE UPDATE ON user_credits 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_oauth_connections_updated_at 
    BEFORE UPDATE ON oauth_connections 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_connections ENABLE ROW LEVEL SECURITY;

-- Policies for users table
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON users;
CREATE POLICY "Enable all operations for authenticated users" ON users
  FOR ALL USING (true) WITH CHECK (true);

-- Policies for user_credits
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON user_credits;
CREATE POLICY "Enable all operations for authenticated users" ON user_credits
  FOR ALL USING (true) WITH CHECK (true);

-- Policies for site_creations
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON site_creations;
CREATE POLICY "Enable all operations for authenticated users" ON site_creations
  FOR ALL USING (true) WITH CHECK (true);

-- Policies for credit_transactions
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON credit_transactions;
CREATE POLICY "Enable all operations for authenticated users" ON credit_transactions
  FOR ALL USING (true) WITH CHECK (true);

-- Policies for oauth_connections
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON oauth_connections;
CREATE POLICY "Enable all operations for authenticated users" ON oauth_connections
  FOR ALL USING (true) WITH CHECK (true);

-- Sample data for testing (optional - remove in production)
INSERT INTO users (id, email, first_name, last_name, email_verified, provider) 
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'test@example.com', 'Test', 'User', true, 'local') 
ON CONFLICT (email) DO NOTHING;

INSERT INTO user_credits (user_id, total_credits, used_credits, plan_type) 
VALUES ('550e8400-e29b-41d4-a716-446655440000', 0, 0, 'free') 
ON CONFLICT (user_id) DO NOTHING;

-- Verify tables were created
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('users', 'user_credits', 'site_creations', 'credit_transactions', 'oauth_connections')
ORDER BY table_name, ordinal_position;
