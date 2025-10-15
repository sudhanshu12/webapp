# Credit System Setup Guide

## Overview
This credit system integrates with your existing Next.js application using Clerk for authentication and Supabase for data storage. Each user gets their own account with credits that are deducted when creating websites.

## Features Implemented

### ✅ Completed Features:
1. **Database Schema** - User credits, site creations, and transaction history
2. **API Endpoints** - Credit check, deduction, purchase, and history
3. **Create Site Integration** - Credits are checked and deducted before site creation
4. **Dashboard Updates** - Real-time credit display and user information
5. **Billing Page** - Plan selection and credit purchase system
6. **Credit History** - Track all credit transactions and site creations

## Setup Instructions

### 1. Database Setup (Supabase)

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL from `database-schema.sql` to create the required tables:
   - `user_credits` - Stores user credit information
   - `site_creations` - Tracks website creation history
   - `credit_transactions` - Records all credit-related transactions

### 2. Environment Variables

Create a `.env.local` file in your project root with:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For production
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 3. Install Dependencies

The required dependencies are already in your `package.json`:
- `@clerk/nextjs` - Authentication
- `@supabase/supabase-js` - Database client

## How It Works

### User Flow:
1. **User Registration** - New users get 1 free credit automatically
2. **Create Site** - When user clicks "Create Site" in wizard:
   - System checks if user has enough credits
   - If yes: deducts 1 credit and proceeds with site creation
   - If no: shows error message with upgrade prompt
3. **Credit Purchase** - Users can upgrade plans to get more credits
4. **History Tracking** - All actions are logged for transparency

### Credit Management:
- **Free Plan**: 1 credit (default for new users)
- **Pro Plan**: 10 credits for $29/month
- **Enterprise Plan**: 50 credits for $99/month

### Database Tables:

#### `user_credits`
- `user_id` (Clerk user ID)
- `total_credits` (total credits available)
- `used_credits` (credits already used)
- `plan_type` (free/pro/enterprise)

#### `site_creations`
- `user_id` (Clerk user ID)
- `site_name` (name of created site)
- `credits_used` (always 1)
- `status` (completed/failed)

#### `credit_transactions`
- `user_id` (Clerk user ID)
- `type` (deduct/add/purchase)
- `amount` (number of credits)
- `description` (human-readable description)

## API Endpoints

### GET `/api/credits/check`
Returns current user's credit information

### POST `/api/credits/deduct`
Deducts credits when creating a site
```json
{
  "siteName": "My Business Site",
  "creditsToDeduct": 1
}
```

### POST `/api/credits/purchase`
Adds credits when purchasing a plan
```json
{
  "planType": "pro",
  "creditsToAdd": 10
}
```

### GET `/api/credits/history`
Returns user's credit transaction and site creation history

## Security Features

- **Row Level Security (RLS)** - Users can only access their own data
- **Authentication Required** - All endpoints require valid Clerk session
- **Transaction Safety** - Credit deduction and site creation are atomic
- **Input Validation** - All API inputs are validated

## Testing the System

1. **Create a new user account** via Clerk
2. **Check dashboard** - Should show 1 free credit
3. **Try creating a site** - Should work and deduct 1 credit
4. **Try creating another site** - Should fail with insufficient credits message
5. **Visit billing page** - Should allow plan upgrade
6. **Purchase a plan** - Should add credits immediately

## Customization Options

### Credit Costs:
- Currently set to 1 credit per site creation
- Can be modified in the wizard's `downloadTheme` function

### Plan Pricing:
- Modify the `plans` array in `/app/billing/page.tsx`
- Update the purchase API to handle different pricing

### Credit Allocation:
- Modify default credits in the credit check API
- Add promotional credit systems

## Troubleshooting

### Common Issues:

1. **"Unauthorized" errors** - Check Clerk configuration
2. **Database connection errors** - Verify Supabase credentials
3. **Credit not deducting** - Check API endpoint responses
4. **User not found** - Ensure user is properly authenticated

### Debug Steps:
1. Check browser console for API errors
2. Verify environment variables are set
3. Check Supabase logs for database errors
4. Ensure RLS policies are properly configured

## Next Steps

### Potential Enhancements:
1. **Payment Integration** - Add Stripe for real payments
2. **Credit Expiration** - Add time-based credit expiration
3. **Referral System** - Give credits for referrals
4. **Admin Dashboard** - Manage user credits and plans
5. **Email Notifications** - Notify users of low credits
6. **Usage Analytics** - Track credit usage patterns

The credit system is now fully integrated and ready for production use!
