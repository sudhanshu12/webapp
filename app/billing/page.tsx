"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ConditionalLayout from '../components/conditional-layout';
import { useSession } from 'next-auth/react';
import { 
  CURRENCIES, 
  PRICING_PACKAGES, 
  getCountryFromIP, 
  getCurrencyForCountry, 
  getCurrencyWithRealTimeRate,
  convertPrice, 
  formatPrice,
  CurrencyInfo,
  PricingPackage 
} from '@/lib/currency';
import { PAYMENT_METHODS, CURRENCY_PAYMENT_METHODS } from '@/lib/cashfree';

interface CreditInfo {
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  planType: string;
}

export default function BillingPage() {
  // Internal billing page for authenticated users - Enhanced with professional pricing and debugging
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [credits, setCredits] = useState<CreditInfo>({
    totalCredits: 1,
    usedCredits: 0,
    remainingCredits: 1,
    planType: 'free'
  });
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<CurrencyInfo>(CURRENCIES.USD);
  const [country, setCountry] = useState<string>('US');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cashfree' | 'paypal'>('cashfree');
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<string[]>([]);

  useEffect(() => {
    // Load user from NextAuth session
    if (status === 'authenticated' && session?.user) {
      setUser({
        email: session.user.email,
        name: session.user.name,
        id: (session.user as any).id
      });
      setIsLoaded(true);
    } else if (status === 'unauthenticated') {
      window.location.href = '/login';
    }
  }, [session, status]);

  // Detect country and set currency - simple approach
  useEffect(() => {
    const detectCountryAndCurrency = async () => {
      try {
        const countryCode = await getCountryFromIP();
        setCountry(countryCode);
        
        // Simple currency logic: INR for India, USD for all other countries
        if (countryCode === 'IN') {
          setCurrency(CURRENCIES.INR);
          console.log('Detected India - using INR');
        } else {
          setCurrency(CURRENCIES.USD);
          console.log('Detected foreign country:', countryCode, '- using USD');
        }
      } catch (error) {
        console.error('Error detecting country:', error);
        // Fallback to USD
        setCurrency(CURRENCIES.USD);
      }
    };

    detectCountryAndCurrency();
  }, []);

  // Update available payment methods when currency changes
  useEffect(() => {
    // Use Cashfree for INR (India), PayPal for USD (foreign countries)
    if (currency.code === 'INR') {
      setAvailablePaymentMethods(['cashfree']);
      setSelectedPaymentMethod('cashfree');
    } else {
      setAvailablePaymentMethods(['paypal']);
      setSelectedPaymentMethod('paypal');
    }
  }, [currency]);

  const fetchCredits = async () => {
    try {
      // Get user email from NextAuth session
      if (!session?.user?.email) {
        console.log('No session found');
        return;
      }
      
      const response = await fetch('/api/credits/check', {
        headers: {
          'x-user-email': session.user.email
        }
      });
      if (response.ok) {
        const creditData = await response.json();
        setCredits(creditData);
      } else {
        console.error('Failed to fetch credits:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  const handlePurchase = async (packageId: string) => {
    try {
      if (!session?.user?.email || !(session.user as any)?.id) {
        alert('Please log in to purchase credits');
        return;
      }

      console.log('Starting purchase process:', {
        packageId,
        currency: currency.code,
        country: country
      });

      // Show loading state
      const button = document.querySelector(`button[onclick*="${packageId}"]`) as HTMLButtonElement;
      if (button) {
        button.disabled = true;
        button.textContent = 'Processing...';
      }

      // Use appropriate payment method based on currency
      if (currency.code === 'INR') {
        console.log('Using Cashfree payment for INR (India)');
        await handleCashfreePayment(packageId);
      } else {
        console.log('Using PayPal payment for USD (Foreign countries)');
        await handlePayPalPayment(packageId);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      // Reset button state
      const button = document.querySelector(`button[onclick*="${packageId}"]`) as HTMLButtonElement;
      if (button) {
        button.disabled = false;
        button.textContent = 'Purchase Credits';
      }
    }
  };

  const handleCashfreePayment = async (packageId: string) => {
    try {
      // Create Cashfree order using simple endpoint
      const response = await fetch('/api/payments/cashfree/simple-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          userEmail: session?.user?.email,
          userId: (session?.user as any)?.id,
          currency: currency.code
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Cashfree payment response:', data);
        
        if (data.paymentSessionId) {
          console.log('Loading Cashfree SDK...');
          // Load Cashfree SDK and open checkout
          await loadCashfreeSDK();
          console.log('Opening Cashfree checkout with session:', data.paymentSessionId);
          openCashfreeCheckout(data.paymentSessionId);
        } else {
          console.error('No paymentSessionId received:', data);
          alert('Payment session not received. Please try again.');
        }
      } else {
        const errorData = await response.json();
        console.error('Cashfree payment error:', errorData);
        console.error('Response status:', response.status);
        
        // If Cashfree fails, offer PayPal as fallback
        if (errorData.error && (errorData.error.includes('not configured') || errorData.error.includes('failed'))) {
          const usePayPal = confirm('Cashfree payment is not available. Would you like to try PayPal instead?');
          if (usePayPal) {
            setSelectedPaymentMethod('paypal');
            await handlePayPalPayment(packageId);
            return;
          }
        }
        
        alert(`Payment failed: ${errorData.error || errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Cashfree payment error:', error);
      alert('Payment failed. Please try again or contact support.');
    }
  };

  const handlePayPalPayment = async (packageId: string) => {
    try {
      console.log('Creating PayPal payment for foreign user:', {
        packageId,
        currency: currency.code,
        userEmail: session?.user?.email
      });

      // Skip pending purchase creation for now - PayPal will handle it via webhook
      console.log('Skipping pending purchase creation - PayPal will handle via webhook');

      // Create PayPal order
      const response = await fetch('/api/payments/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          userEmail: session?.user?.email,
          userId: (session?.user as any)?.id,
          currency: currency.code
        })
      });

      console.log('PayPal API response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('PayPal payment response:', data);
        
        if (data.approvalUrl) {
          console.log('Redirecting to PayPal:', data.approvalUrl);
          // Redirect to PayPal
          window.location.href = data.approvalUrl;
        } else {
          console.error('No approvalUrl in PayPal response:', data);
          throw new Error('PayPal payment link not received');
        }
      } else {
        const errorData = await response.json();
        console.error('PayPal payment failed:', errorData);
        console.error('Response status:', response.status);
        throw new Error(`PayPal payment failed: ${errorData.error || errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('PayPal payment error:', error);
      throw error; // Re-throw to trigger fallback
    }
  };

  const loadCashfreeSDK = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if ((window as any).Cashfree) {
        console.log('Cashfree SDK already loaded');
        resolve();
        return;
      }

      console.log('Loading Cashfree SDK from:', 'https://sdk.cashfree.com/js/v3/cashfree.js');
      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.onload = () => {
        console.log('Cashfree SDK loaded successfully');
        resolve();
      };
      script.onerror = (error) => {
        console.error('Failed to load Cashfree SDK:', error);
        reject(new Error('Failed to load Cashfree SDK'));
      };
      document.head.appendChild(script);
    });
  };

  const openCashfreeCheckout = (paymentSessionId: string) => {
    try {
      console.log('Initializing Cashfree with mode:', process.env.NODE_ENV === 'production' ? 'production' : 'sandbox');
      
      const cashfree = (window as any).Cashfree({
        mode: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
      });

      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: '_self'
      };

      console.log('Opening checkout with options:', checkoutOptions);
      cashfree.checkout(checkoutOptions);
    } catch (error) {
      console.error('Error opening Cashfree checkout:', error);
      alert('Failed to open payment page. Please try again.');
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchCredits().then(() => setLoading(false));
    } else if (isLoaded && !user) {
      // Redirect to login if no user is found
      window.location.href = '/login';
    }
  }, [isLoaded, user]);

  // Set noindex meta tag
  useEffect(() => {
    // Add noindex meta tag
    let noindexMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!noindexMeta) {
      noindexMeta = document.createElement('meta') as HTMLMetaElement;
      noindexMeta.name = 'robots';
      document.head.appendChild(noindexMeta);
    }
    noindexMeta.content = 'noindex, nofollow';
  }, []);

  if (loading) {
    return (
      <ConditionalLayout>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Loading billing information...
        </div>
      </ConditionalLayout>
    );
  }

  return (
    <ConditionalLayout>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        background: '#f9fafb',
        minHeight: '100vh'
      }}>
        {/* Page Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '16px'
          }}>
            Billing & Usage
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            maxWidth: '700px',
            margin: '0 auto 32px',
            lineHeight: '1.6'
          }}>
            Manage your account, view usage, and upgrade your plan
          </p>
        </div>

        {/* Current Usage */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Current Usage
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#059669'
              }}>
                {credits.remainingCredits}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Credits Remaining
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#dc2626'
              }}>
                {credits.usedCredits}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Credits Used
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                {credits.totalCredits}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Total Credits
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#7c3aed'
              }}>
                {credits.planType.charAt(0).toUpperCase() + credits.planType.slice(1)}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Current Plan
              </div>
            </div>
          </div>
        </div>

            {/* Auto-detected Currency Only - Payment method selection hidden */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
                {/* Auto-detected Currency */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '4px'
                  }}>
                    Auto-detected Location
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    {country} • {currency.name} ({currency.symbol})
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#9ca3af',
                    marginTop: '2px'
                  }}>
                    Prices converted automatically
                  </div>
                  {currency.code === 'INR' && (
                    <div style={{
                      fontSize: '10px',
                      color: '#059669',
                      marginTop: '4px',
                      padding: '2px 6px',
                      background: '#ecfdf5',
                      borderRadius: '4px',
                      display: 'inline-block'
                    }}>
                      💳 Cashfree payments available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Plans Section */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                Upgrade Your Plan
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                textAlign: 'center',
                marginBottom: '32px'
              }}>
                Choose a plan that fits your needs
              </p>

              {/* Pricing Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                marginBottom: '32px'
              }}>
                {/* Free Plan */}
                <div style={{
                  background: '#f9fafb',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px'
                  }}>
                    Current Plan
                  </div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#111827',
                    marginBottom: '4px'
                  }}>
                    Free
                  </div>
                  <div style={{
                    fontSize: '16px',
                    color: '#6b7280',
                    marginBottom: '24px'
                  }}>
                    Free
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '24px',
                    lineHeight: '1.5'
                  }}>
                    • 1 website build<br/>
                    • Basic features<br/>
                    • Email support
                  </div>
                  <div style={{
                    padding: '12px',
                    background: '#10b981',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    Current Plan
                  </div>
                </div>

                {/* Starter Pack */}
                <div style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '24px',
                  textAlign: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#3b82f6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px'
                  }}>
                    Starter Pack
                  </div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '4px'
                  }}>
                    {currency.code === 'INR' ? '₹4,343' : '$49'}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '24px'
                  }}>
                    One-time payment
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#374151',
                    marginBottom: '24px',
                    lineHeight: '1.5'
                  }}>
                    <div style={{ marginBottom: '8px' }}>• 5 website builds</div>
                    <div style={{ marginBottom: '8px' }}>• All premium features</div>
                    <div style={{ marginBottom: '8px' }}>• Priority support</div>
                  </div>
                  <button 
                    onClick={() => handlePurchase('starter')}
                    style={{
                      width: '100%',
                      padding: '12px 24px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#2563eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#3b82f6';
                    }}
                  >
                    Purchase Credits
                  </button>
                </div>

                {/* Pro Pack */}
                <div style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '24px',
                  textAlign: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#7c3aed',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px'
                  }}>
                    Pro Pack
                  </div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '4px'
                  }}>
                    {currency.code === 'INR' ? '₹11,457' : '$129'}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '24px'
                  }}>
                    One-time payment
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#374151',
                    marginBottom: '24px',
                    lineHeight: '1.5'
                  }}>
                    <div style={{ marginBottom: '8px' }}>• 30 website builds</div>
                    <div style={{ marginBottom: '8px' }}>• All premium features</div>
                    <div style={{ marginBottom: '8px' }}>• Priority support</div>
                  </div>
                  <button 
                    onClick={() => handlePurchase('pro')}
                    style={{
                      width: '100%',
                      padding: '12px 24px',
                      background: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#6d28d9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#7c3aed';
                    }}
                  >
                    Purchase Credits
                  </button>
                </div>
              </div>

              {/* Features */}
              <div style={{
                background: '#f9fafb',
                borderRadius: '8px',
                padding: '24px',
                marginTop: '32px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '16px',
                  textAlign: 'center'
                }}>
                  What's Included
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#374151' }}>AI-powered content generation</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#374151' }}>SEO-optimized websites</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#374151' }}>Mobile-responsive design</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#374151' }}>WordPress theme download</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#374151' }}>Professional templates</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#374151' }}>Customer support</span>
                  </div>
                </div>
              </div>
            </div>

        {/* Account Information */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Account Information
          </h2>
          <div style={{
            display: 'grid',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              background: '#f9fafb',
              borderRadius: '8px'
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Email
              </span>
              <span style={{
                fontSize: '16px',
                color: '#6b7280'
              }}>
                {user?.email}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              background: '#f9fafb',
              borderRadius: '8px'
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Plan Type
              </span>
              <span style={{
                fontSize: '16px',
                color: '#6b7280',
                textTransform: 'capitalize'
              }}>
                {credits.planType}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              background: '#f9fafb',
              borderRadius: '8px'
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Websites Built
              </span>
              <span style={{
                fontSize: '16px',
                color: '#6b7280'
              }}>
                {credits.usedCredits} / {credits.totalCredits}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ConditionalLayout>
  );
}
