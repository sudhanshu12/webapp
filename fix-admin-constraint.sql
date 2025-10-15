-- Fix the credit_transactions constraint to allow admin_adjustment
-- Run this in your Supabase SQL editor

ALTER TABLE credit_transactions DROP CONSTRAINT IF EXISTS credit_transactions_type_check;
ALTER TABLE credit_transactions ADD CONSTRAINT credit_transactions_type_check CHECK (type IN ('deduct', 'add', 'purchase', 'admin_adjustment'));

-- Verify the constraint was updated
SELECT conname, consrc 
FROM pg_constraint 
WHERE conname = 'credit_transactions_type_check';
