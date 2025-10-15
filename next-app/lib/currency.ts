// Currency conversion and country-specific pricing
export interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number; // Rate from USD
  name: string;
}

// Base currency symbols and names (rates will be fetched in real-time)
export const CURRENCY_SYMBOLS: Record<string, { symbol: string; name: string }> = {
  USD: { symbol: '$', name: 'US Dollar' },
  INR: { symbol: '₹', name: 'Indian Rupee' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  SGD: { symbol: 'S$', name: 'Singapore Dollar' },
  AED: { symbol: 'د.إ', name: 'UAE Dirham' },
  SAR: { symbol: '﷼', name: 'Saudi Riyal' },
};

// Fallback rates (will be overridden by real-time data)
export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', rate: 1, name: 'US Dollar' },
  INR: { code: 'INR', symbol: '₹', rate: 83.5, name: 'Indian Rupee' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound' },
  CAD: { code: 'CAD', symbol: 'C$', rate: 1.36, name: 'Canadian Dollar' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.52, name: 'Australian Dollar' },
  JPY: { code: 'JPY', symbol: '¥', rate: 150, name: 'Japanese Yen' },
  SGD: { code: 'SGD', symbol: 'S$', rate: 1.35, name: 'Singapore Dollar' },
  AED: { code: 'AED', symbol: 'د.إ', rate: 3.67, name: 'UAE Dirham' },
  SAR: { code: 'SAR', symbol: '﷼', rate: 3.75, name: 'Saudi Riyal' },
};

export interface PricingPackage {
  id: string;
  name: string;
  credits: number;
  priceUSD: number;
  features: string[];
  popular?: boolean;
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'free',
    name: 'Free Plan',
    credits: 1,
    priceUSD: 0,
    features: [
      '1 Website Build',
      'Basic Templates',
      'Email Support'
    ]
  },
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 5,
    priceUSD: 49,
    features: [
      '5 Website Builds',
      'Premium Templates',
      'Priority Support',
      'Custom Domain Setup'
    ],
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    credits: 30,
    priceUSD: 129,
    features: [
      '30 Website Builds',
      'All Templates',
      'Priority Support',
      'Custom Domain Setup',
      'Advanced SEO Tools',
      'Analytics Integration'
    ]
  }
];

export function getCountryFromIP(): Promise<string> {
  return new Promise((resolve) => {
    // Try to get country from IP using a free service
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        resolve(data.country_code || 'US');
      })
      .catch(() => {
        // Fallback to US if IP detection fails
        resolve('US');
      });
  });
}

// Real-time currency conversion
export async function fetchExchangeRates(): Promise<Record<string, number>> {
  try {
    // Use a free exchange rate API
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    // Return fallback rates
    return {
      USD: 1,
      INR: 83.5,
      EUR: 0.92,
      GBP: 0.79,
      CAD: 1.36,
      AUD: 1.52,
      JPY: 150,
      SGD: 1.35,
      AED: 3.67,
      SAR: 3.75,
    };
  }
}

export async function getCurrencyWithRealTimeRate(currencyCode: string): Promise<CurrencyInfo> {
  try {
    const rates = await fetchExchangeRates();
    const rate = rates[currencyCode] || 1;
    const symbolData = CURRENCY_SYMBOLS[currencyCode] || { symbol: currencyCode, name: currencyCode };
    
    return {
      code: currencyCode,
      symbol: symbolData.symbol,
      rate: rate,
      name: symbolData.name
    };
  } catch (error) {
    console.error('Error getting real-time currency rate:', error);
    // Fallback to static rates
    return CURRENCIES[currencyCode] || CURRENCIES.USD;
  }
}

export function getCurrencyForCountry(countryCode: string): CurrencyInfo {
  const countryCurrencyMap: Record<string, string> = {
    'US': 'USD',
    'IN': 'INR',
    'GB': 'GBP',
    'CA': 'CAD',
    'AU': 'AUD',
    'JP': 'JPY',
    'SG': 'SGD',
    'AE': 'AED',
    'SA': 'SAR',
    'DE': 'EUR',
    'FR': 'EUR',
    'IT': 'EUR',
    'ES': 'EUR',
    'NL': 'EUR',
    'BE': 'EUR',
    'AT': 'EUR',
    'FI': 'EUR',
    'IE': 'EUR',
    'PT': 'EUR',
    'GR': 'EUR',
    'LU': 'EUR',
    'MT': 'EUR',
    'CY': 'EUR',
    'SK': 'EUR',
    'SI': 'EUR',
    'EE': 'EUR',
    'LV': 'EUR',
    'LT': 'EUR',
  };

  const currencyCode = countryCurrencyMap[countryCode] || 'USD';
  return CURRENCIES[currencyCode];
}

export function convertPrice(priceUSD: number, currency: CurrencyInfo): number {
  return Math.round(priceUSD * currency.rate * 100) / 100;
}

export function formatPrice(price: number, currency: CurrencyInfo): string {
  if (currency.code === 'JPY' || currency.code === 'INR') {
    // No decimal places for JPY and INR
    return `${currency.symbol}${Math.round(price)}`;
  }
  return `${currency.symbol}${price.toFixed(2)}`;
}
