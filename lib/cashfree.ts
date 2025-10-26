// Cashfree Payment Gateway Configuration
export const cashfreeConfig = {
  appId: process.env.CASHFREE_APP_ID || '11007306a0ee5e16d8e68e2382f0370011',
  secretKey: process.env.CASHFREE_SECRET_KEY || '',
  environment: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'SANDBOX',
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.cashfree.com/pg' 
    : 'https://sandbox.cashfree.com/pg',
  // Partner authentication for embedded payments
  partnerApiKey: process.env.CASHFREE_PARTNER_API_KEY || '',
  partnerMerchantId: process.env.CASHFREE_PARTNER_MERCHANT_ID || '',
  // Use partner auth if available, otherwise fallback to regular auth
  usePartnerAuth: !!(process.env.CASHFREE_PARTNER_API_KEY && process.env.CASHFREE_PARTNER_MERCHANT_ID)
};

// Payment package configurations (prices in USD for conversion)
export const paymentPackages = {
  starter: {
    id: 'starter',
    name: 'Starter Pack',
    priceUSD: 0.01, // TESTING: ₹1 (0.01 USD)
    credits: 5,
    description: '5 Website Builds with Premium Templates'
  },
  pro: {
    id: 'pro', 
    name: 'Pro Pack',
    priceUSD: 129, // USD price for conversion
    credits: 30,
    description: '30 Website Builds with All Templates'
  }
};

// Supported payment methods as per Cashfree documentation
export const PAYMENT_METHODS = {
  // Card payments
  CARDS: 'cc,dc',
  // UPI payments
  UPI: 'upi',
  // Net banking
  NETBANKING: 'nb',
  // Wallets
  WALLETS: 'wallet',
  // PayPal
  PAYPAL: 'paypal',
  // EMI options
  EMI: 'emi',
  // Pay Later options
  PAY_LATER: 'paylater',
  // All methods combined
  ALL: 'cc,dc,upi,nb,paypal,emi,paylater'
};

// Currency support for different payment methods
export const CURRENCY_PAYMENT_METHODS = {
  'INR': 'cc,dc,upi,nb,paypal,emi,paylater', // India - all methods
  'USD': 'cc,dc,paypal', // US - cards and PayPal
  'EUR': 'cc,dc,paypal', // Europe - cards and PayPal
  'GBP': 'cc,dc,paypal', // UK - cards and PayPal
  'CAD': 'cc,dc,paypal', // Canada - cards and PayPal
  'AUD': 'cc,dc,paypal', // Australia - cards and PayPal
  'JPY': 'cc,dc,paypal', // Japan - cards and PayPal
  'SGD': 'cc,dc,paypal', // Singapore - cards and PayPal
  'AED': 'cc,dc,paypal', // UAE - cards and PayPal
  'SAR': 'cc,dc,paypal'  // Saudi Arabia - cards and PayPal
};

// Create order request payload
export interface CreateOrderRequest {
  orderId: string;
  orderAmount: number;
  orderCurrency: string;
  customerDetails: {
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
  orderMeta: {
    returnUrl: string;
    notifyUrl: string;
    paymentMethods: string;
  };
}

// Create order response
export interface CreateOrderResponse {
  status: string;
  message: string;
  data: {
    paymentSessionId: string;
    orderId: string;
    orderAmount: number;
    orderCurrency: string;
    paymentUrl: string;
  };
}

// Payment status response
export interface PaymentStatusResponse {
  status: string;
  message: string;
  data: {
    orderId: string;
    orderAmount: number;
    orderCurrency: string;
    orderStatus: string;
    paymentStatus: string;
    paymentTime: string;
  };
}
