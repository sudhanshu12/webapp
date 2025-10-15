# Cashfree Payment Gateway Integration Guide

## Overview
This guide explains how to set up and use the Cashfree payment gateway integration in your Create A Website Click application.

## Prerequisites
- Cashfree account with API credentials
- Supabase database setup
- Next.js application deployed on Vercel

## Setup Steps

### 1. Environment Variables
Add these environment variables to your Vercel dashboard:

```bash
CASHFREE_APP_ID=11007306a0ee5e16d8e68e2382f0370011
CASHFREE_SECRET_KEY=11007306a0ee5e16d8e68e2382f0370011
CASHFREE_WEBHOOK_SECRET=your-webhook-secret-here
```

### 2. Database Setup
Run the SQL script in your Supabase SQL Editor:

```sql
-- See CASHFREE_SETUP.sql for the complete database schema
-- This creates the payment_orders table and necessary indexes
```

### 3. API Endpoints

#### Create Payment Order
- **Endpoint**: `/api/payments/cashfree/create-order`
- **Method**: POST
- **Body**: `{ packageId, userEmail, userId }`
- **Response**: `{ success, orderId, paymentUrl, amount, currency }`

#### Payment Webhook
- **Endpoint**: `/api/payments/cashfree/webhook`
- **Method**: POST
- **Purpose**: Handles payment status updates from Cashfree

#### Payment Status Check
- **Endpoint**: `/api/payments/cashfree/status`
- **Method**: GET
- **Query**: `?orderId=order_id`
- **Response**: Order status and payment details

### 4. Payment Flow

1. **User clicks "Choose Plan"** on pricing page
2. **Create Order API** is called with package details
3. **Cashfree order** is created and payment URL is returned
4. **User is redirected** to Cashfree payment page
5. **Payment is processed** on Cashfree's secure platform
6. **Webhook is triggered** when payment status changes
7. **User credits are updated** automatically in database
8. **User is redirected** back to dashboard

### 5. Package Configuration

#### Starter Pack
- **Price**: ₹49
- **Credits**: 5 Website Builds
- **Features**: Premium Templates, Priority Support

#### Pro Pack
- **Price**: ₹129
- **Credits**: 30 Website Builds
- **Features**: All Templates, Priority Support, Custom Branding

### 6. Security Features

- **Webhook Signature Verification**: Ensures webhooks are from Cashfree
- **Database Transaction Logging**: All payments are tracked
- **User Credit Validation**: Prevents duplicate credit allocation
- **Order Status Tracking**: Complete payment lifecycle monitoring

### 7. Testing

#### Sandbox Mode
- Set `NODE_ENV=development` for sandbox testing
- Use test card numbers provided by Cashfree
- All transactions are simulated

#### Production Mode
- Set `NODE_ENV=production` for live payments
- Real money transactions
- Webhook URLs must be HTTPS

### 8. Webhook Configuration

In your Cashfree dashboard, set the webhook URL to:
```
https://your-domain.com/api/payments/cashfree/webhook
```

### 9. Error Handling

The integration includes comprehensive error handling for:
- Network failures
- Invalid payment data
- Database errors
- Webhook signature mismatches
- Duplicate order prevention

### 10. Monitoring

Monitor payment success through:
- Supabase `payment_orders` table
- Cashfree dashboard analytics
- Application logs for debugging

## Troubleshooting

### Common Issues

1. **Payment not processing**
   - Check Cashfree credentials
   - Verify webhook URL is accessible
   - Check database connection

2. **Credits not updating**
   - Check webhook endpoint logs
   - Verify user exists in database
   - Check payment status in Cashfree dashboard

3. **Order creation fails**
   - Verify API credentials
   - Check request payload format
   - Ensure user is authenticated

### Debug Steps

1. Check browser console for JavaScript errors
2. Check Vercel function logs for API errors
3. Check Supabase logs for database errors
4. Check Cashfree dashboard for payment status

## Support

For Cashfree-specific issues:
- Cashfree Documentation: https://docs.cashfree.com/
- Cashfree Support: support@cashfree.com

For application-specific issues:
- Check application logs
- Verify environment variables
- Test with sandbox mode first
