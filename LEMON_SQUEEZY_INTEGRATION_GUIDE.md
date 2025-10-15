# 🍋 Lemon Squeezy Integration Guide

## Overview
This guide will help you integrate [Lemon Squeezy](https://www.lemonsqueezy.com/) payment gateway into your application. Lemon Squeezy is a merchant of record that handles global tax compliance, fraud prevention, and supports 20+ payment methods.

---

## 🚀 Setup Steps

### **Step 1: Create Lemon Squeezy Account**

1. Go to [Lemon Squeezy](https://www.lemonsqueezy.com/)
2. Click "Get started for free"
3. Sign up for an account
4. Complete the merchant onboarding process

### **Step 2: Create Your Store**

1. In Lemon Squeezy dashboard, create a new store
2. Set up your store details (name, description, etc.)
3. Note down your **Store ID**

### **Step 3: Create Products**

1. Go to "Products" in your Lemon Squeezy dashboard
2. Create products for each credit package:
   - **Starter Pack** - $29 (5 credits)
   - **Pro Pack** - $79 (15 credits) 
   - **Enterprise Pack** - $199 (50 credits)
3. Note down the **Variant ID** for each product

### **Step 4: Get API Keys**

1. Go to "Settings" → "API" in Lemon Squeezy dashboard
2. Generate a new API key
3. Note down your **API Key**

### **Step 5: Set Up Webhooks**

1. Go to "Settings" → "Webhooks" in Lemon Squeezy dashboard
2. Add webhook URL: `https://createawebsite.click/api/payments/webhook`
3. Select events: `order_created`, `order_refunded`
4. Note down your **Webhook Secret**

### **Step 6: Update Environment Variables**

Add these to your Vercel environment variables:

```bash
LEMON_SQUEEZY_API_KEY = [your-api-key]
LEMON_SQUEEZY_STORE_ID = [your-store-id]
LEMON_SQUEEZY_VARIANT_ID = [your-variant-id]
LEMON_SQUEEZY_WEBHOOK_SECRET = [your-webhook-secret]
```

### **Step 7: Set Up Database Tables**

Run the SQL commands in `LEMON_SQUEEZY_SETUP.sql` in your Supabase SQL Editor to create the necessary tables.

---

## 🔧 How It Works

### **Purchase Flow**
1. User clicks "Purchase" on a plan in Billing page
2. App calls `/api/payments/create-checkout`
3. Creates checkout URL with Lemon Squeezy
4. User redirected to Lemon Squeezy checkout
5. User completes payment
6. Lemon Squeezy sends webhook to `/api/payments/webhook`
7. App processes webhook and adds credits to user account

### **Webhook Events**
- `order_created` - Adds credits to user account
- `order_refunded` - Removes credits from user account

### **Credit Packages**
- **Free**: 1 credit (no payment)
- **Starter**: 5 credits for $29
- **Pro**: 15 credits for $79
- **Enterprise**: 50 credits for $199

---

## 🛠️ API Endpoints

### **Create Checkout**
```
POST /api/payments/create-checkout
{
  "packageId": "starter",
  "userEmail": "user@example.com",
  "userId": "user-uuid"
}
```

### **Webhook Handler**
```
POST /api/payments/webhook
[Lemon Squeezy webhook data]
```

---

## 🧪 Testing

### **Test Mode**
1. Use Lemon Squeezy test mode for development
2. Test with test credit cards
3. Verify webhook delivery

### **Production**
1. Switch to live mode
2. Test with real payments
3. Monitor webhook logs

---

## 📊 Database Tables

### **pending_purchases**
- Tracks purchases before completion
- Links user to package

### **purchases**
- Records completed purchases
- Links to Lemon Squeezy order ID
- Tracks credits purchased and amount paid

---

## 🔒 Security Features

- **Webhook Signature Verification**: Ensures webhooks are from Lemon Squeezy
- **Row Level Security**: Users can only see their own purchases
- **Fraud Prevention**: Handled by Lemon Squeezy
- **Global Tax Compliance**: Handled by Lemon Squeezy

---

## 🎯 Benefits

- **Merchant of Record**: Lemon Squeezy handles all tax compliance
- **Global Payments**: Accept payments from 135+ countries
- **Multiple Payment Methods**: 20+ payment options
- **Fraud Prevention**: AI-powered fraud detection
- **Failed Payment Recovery**: Automatic retry system

---

## 📞 Support

- **Lemon Squeezy Docs**: [docs.lemonsqueezy.com](https://docs.lemonsqueezy.com)
- **API Reference**: [docs.lemonsqueezy.com/api](https://docs.lemonsqueezy.com/api)
- **Webhook Guide**: [docs.lemonsqueezy.com/webhooks](https://docs.lemonsqueezy.com/webhooks)

---

**Ready to start selling! 🚀**
