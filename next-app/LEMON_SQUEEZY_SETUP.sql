-- Lemon Squeezy Integration Database Setup
-- Run these SQL commands in your Supabase SQL Editor

-- Table for tracking pending purchases
CREATE TABLE IF NOT EXISTS pending_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  package_id TEXT NOT NULL,
  user_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for completed purchases
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  package_id TEXT NOT NULL,
  credits_purchased INTEGER NOT NULL,
  amount_paid DECIMAL(10,2) NOT NULL,
  order_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pending_purchases_user_id ON pending_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_pending_purchases_status ON pending_purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_order_id ON purchases(order_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);

-- Add RLS (Row Level Security) policies
ALTER TABLE pending_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own pending purchases
CREATE POLICY "Users can view own pending purchases" ON pending_purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only see their own purchases
CREATE POLICY "Users can view own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Service role can manage all records
CREATE POLICY "Service role can manage pending purchases" ON pending_purchases
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage purchases" ON purchases
  FOR ALL USING (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT ALL ON pending_purchases TO service_role;
GRANT ALL ON purchases TO service_role;
GRANT SELECT ON pending_purchases TO authenticated;
GRANT SELECT ON purchases TO authenticated;
