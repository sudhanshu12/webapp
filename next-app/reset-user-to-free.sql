-- Reset user to free plan
-- Run this in your Supabase SQL editor to reset a user to free plan

-- Update user_credits to free plan (replace with actual user ID)
UPDATE user_credits 
SET 
  plan_type = 'free',
  total_credits = 1,
  used_credits = 0,
  updated_at = NOW()
WHERE user_id = 'YOUR_USER_ID_HERE';

-- Or reset all users to free plan (be careful with this!)
-- UPDATE user_credits 
-- SET 
--   plan_type = 'free',
--   total_credits = 1,
--   used_credits = 0,
--   updated_at = NOW();

-- Check current user credits
SELECT user_id, plan_type, total_credits, used_credits 
FROM user_credits 
ORDER BY updated_at DESC;
