-- Cashfree Payment Gateway Database Setup
-- Run this in your Supabase SQL Editor

-- Table to store payment orders
CREATE TABLE IF NOT EXISTS payment_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id VARCHAR(255) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user_email VARCHAR(255) NOT NULL,
    package_id VARCHAR(50) NOT NULL, -- 'starter' or 'pro'
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'PAID', 'FAILED', 'CANCELLED'
    payment_status VARCHAR(50), -- 'SUCCESS', 'FAILED', 'PENDING'
    cashfree_order_id VARCHAR(255),
    payment_session_id VARCHAR(255),
    payment_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_payment_orders_user_id ON payment_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_order_id ON payment_orders(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_cashfree_order_id ON payment_orders(cashfree_order_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_status ON payment_orders(status);

-- Add RLS (Row Level Security) policies
ALTER TABLE payment_orders ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to see their own orders
CREATE POLICY "Users can view their own payment orders" ON payment_orders
    FOR SELECT USING (auth.uid() = user_id);

-- Policy to allow service role to insert/update orders
CREATE POLICY "Service role can manage payment orders" ON payment_orders
    FOR ALL USING (auth.role() = 'service_role');

-- Update function for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_payment_orders_updated_at 
    BEFORE UPDATE ON payment_orders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
