# Cashfree Payment Gateway Setup

## Required Environment Variables

To fix the "Cashfree payment creation failed" error, you need to set these environment variables in your deployment platform (Vercel):

### 1. Basic Cashfree Configuration
```
CASHFREE_APP_ID=11007306a0ee5e16d8e68e2382f0370011
CASHFREE_SECRET_KEY=your_cashfree_secret_key_here
CASHFREE_ENVIRONMENT=SANDBOX
```

### 2. Partner Authentication (Optional - for embedded payments)
```
CASHFREE_PARTNER_API_KEY=your_partner_api_key_here
CASHFREE_PARTNER_MERCHANT_ID=your_partner_merchant_id_here
```

### 3. PayPal Configuration (Fallback)
```
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
PAYPAL_BUSINESS_EMAIL=your_paypal_business_email_here
```

## How to Get Cashfree Credentials

1. **Sign up for Cashfree**: Go to https://www.cashfree.com/
2. **Create a merchant account**
3. **Get API credentials** from the dashboard
4. **Set up webhooks** (optional but recommended)

## Testing the Setup

1. **Test credentials**: Visit `/api/payments/cashfree/test-credentials`
2. **Check environment**: Visit `/api/env-check`
3. **Test payment**: Try making a payment on the billing page

## Current Status

- ✅ **PayPal integration**: Working with fallback URLs
- ❌ **Cashfree integration**: Requires secret key configuration
- ✅ **Currency conversion**: Automatic based on location
- ✅ **Payment method selection**: Auto-selects based on currency

## Fallback Behavior

If Cashfree is not configured:
1. System will show error message
2. User will be offered PayPal as alternative
3. Payment will proceed with PayPal

## Next Steps

1. Add `CASHFREE_SECRET_KEY` to your Vercel environment variables
2. Redeploy the application
3. Test payment functionality
4. Set up webhooks for production (optional)
