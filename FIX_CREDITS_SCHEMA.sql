-- Fix Credits Schema - Run this in Supabase SQL Editor
-- This script fixes the user_credits table to match the expected schema

-- First, let's see what columns exist
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'user_credits';

-- Add missing columns if they don't exist
DO $$ 
BEGIN
    -- Add remaining_credits column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_credits' AND column_name = 'remaining_credits') THEN
        ALTER TABLE user_credits ADD COLUMN remaining_credits INTEGER DEFAULT 1;
    END IF;
    
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_credits' AND column_name = 'updated_at') THEN
        ALTER TABLE user_credits ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add created_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_credits' AND column_name = 'created_at') THEN
        ALTER TABLE user_credits ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Update existing records to have remaining_credits = total_credits - used_credits
UPDATE user_credits 
SET remaining_credits = total_credits - used_credits
WHERE remaining_credits IS NULL;

-- Set default values for any NULL remaining_credits
UPDATE user_credits 
SET remaining_credits = 1 
WHERE remaining_credits IS NULL OR remaining_credits < 0;

-- Create missing credits for users who don't have any
INSERT INTO user_credits (user_id, total_credits, used_credits, remaining_credits, plan_type, created_at, updated_at)
SELECT 
    u.id, 
    1, 
    0, 
    1, 
    'free',
    NOW(),
    NOW()
FROM users u 
LEFT JOIN user_credits uc ON u.id = uc.user_id 
WHERE uc.user_id IS NULL;

-- Verify the fix worked
SELECT 
    u.email,
    uc.total_credits,
    uc.used_credits,
    uc.remaining_credits,
    uc.plan_type
FROM users u
LEFT JOIN user_credits uc ON u.id = uc.user_id
WHERE u.email = 'sscexamsinfo@gmail.com';
