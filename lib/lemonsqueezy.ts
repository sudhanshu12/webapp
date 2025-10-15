// Lemon Squeezy integration - temporarily disabled to fix build
// import { LemonSqueezy } from '@lemonsqueezy/lemonsqueezy.js';

// Initialize Lemon Squeezy client
// export const lemonSqueezy = new LemonSqueezy(process.env.LEMON_SQUEEZY_API_KEY!);

// Store configuration
export const lemonSqueezyConfig = {
  storeId: process.env.LEMON_SQUEEZY_STORE_ID!,
  variantId: process.env.LEMON_SQUEEZY_VARIANT_ID!, // For credit packages
  webhookSecret: process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!,
};

// Credit packages configuration
export const creditPackages = [
  {
    id: 'free',
    name: 'Free Plan',
    credits: 1,
    price: 0,
    description: 'Perfect for trying out our service',
    features: ['1 Website Build', 'Basic Templates', 'Email Support']
  },
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 5,
    price: 29,
    description: 'Great for small businesses',
    features: ['5 Website Builds', 'Premium Templates', 'Priority Support']
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    credits: 15,
    price: 79,
    description: 'Perfect for growing businesses',
    features: ['15 Website Builds', 'All Templates', 'Priority Support', 'Custom Branding']
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    credits: 50,
    price: 199,
    description: 'For agencies and large teams',
    features: ['50 Website Builds', 'All Templates', 'White-label Options', 'API Access']
  }
];

// Helper function to get package by ID
export function getCreditPackage(packageId: string) {
  return creditPackages.find(pkg => pkg.id === packageId);
}

// Helper function to create checkout URL
export function createCheckoutUrl(packageId: string, userEmail: string, userId: string) {
  const packageData = getCreditPackage(packageId);
  if (!packageData) {
    throw new Error('Invalid package ID');
  }

  // For free packages, no checkout needed
  if (packageData.price === 0) {
    return null;
  }

  // Create checkout URL for paid packages
  const checkoutUrl = `https://${lemonSqueezyConfig.storeId}.lemonsqueezy.com/checkout/buy/${lemonSqueezyConfig.variantId}?checkout[email]=${encodeURIComponent(userEmail)}&checkout[custom][user_id]=${userId}&checkout[custom][package_id]=${packageId}`;
  
  return checkoutUrl;
}
