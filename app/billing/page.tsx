"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ConditionalLayout from '../components/conditional-layout';
// import { useUser } from '@clerk/nextjs';

interface CreditInfo {
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  planType: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  credits: number;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    credits: 1,
    features: [
      '1 Website Build',
      'Basic Templates',
      'Email Support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    credits: 5,
    features: [
      '5 Website Builds per Month',
      'Premium Templates',
      'Priority Support',
      'Custom Branding',
      'Advanced Analytics'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 129,
    credits: 30,
    features: [
      '30 Website Builds per Month',
      'All Templates',
      '24/7 Support',
      'White-label Options',
      'API Access',
      'Custom Integrations',
      'Upcoming Updates'
    ]
  }
];

export default function BillingPage() {
  // const { user, isLoaded } = useUser();
  const [user, setUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [credits, setCredits] = useState<CreditInfo>({
    totalCredits: 1,
    usedCredits: 0,
    remainingCredits: 1,
    planType: 'free'
  });
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    // Load user from localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
    setIsLoaded(true);
  }, []);

  const fetchCredits = async () => {
    try {
      // Get user from localStorage
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        console.log('No user found in localStorage');
        return;
      }

      const user = JSON.parse(currentUser);
      
      const response = await fetch('/api/credits/check', {
        headers: {
          'x-user-id': user.id
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

  useEffect(() => {
    if (isLoaded && user) {
      fetchCredits().then(() => setLoading(false));
    } else if (isLoaded && !user) {
      // Redirect to login if no user is found
      window.location.href = '/login';
    }
  }, [isLoaded, user]);

  // Listen for credit updates from other pages
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'creditsUpdated' && user) {
        fetchCredits();
      }
    };

    const handleFocus = () => {
      if (user) {
        fetchCredits();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user]);

  const handlePurchase = async (plan: Plan) => {
    if (plan.id === 'free') return;
    
    setPurchasing(plan.id);
    try {
      const response = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id
        },
        body: JSON.stringify({
          planType: plan.id,
          creditsToAdd: plan.credits
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setCredits(result);
        
        alert(`✅ Successfully upgraded to ${plan.name} plan! Added ${result.creditsAdded} credits.`);
        
        // Notify other pages that credits have been updated
        localStorage.setItem('creditsUpdated', Date.now().toString());
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('❌ An error occurred during purchase. Please try again.');
    } finally {
      setPurchasing(null);
    }
  };

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
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '16px'
          }}>
            Choose Your Plan
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Upgrade your plan to get more website builds and unlock premium features
          </p>
        </div>

        {/* Plans Grid - Moved Above the Fold */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '48px'
        }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: plan.popular ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                position: 'relative',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#7c3aed',
                  color: 'white',
                  padding: '8px 24px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  Most Popular
                </div>
              )}

              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '8px'
                }}>
                  {plan.name}
                </h3>
                <div style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '8px'
                }}>
                  ${plan.price}
                  {plan.price > 0 && (
                    <span style={{
                      fontSize: '18px',
                      fontWeight: 'normal',
                      color: '#6b7280'
                    }}>
                      /month
                    </span>
                  )}
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#6b7280'
                }}>
                  {plan.credits} Website Build{plan.credits !== 1 ? 's' : ''}
                </div>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 20px 0'
              }}>
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '5px 0',
                      fontSize: '16px',
                      color: '#374151'
                    }}
                  >
                    <span style={{
                      color: '#059669',
                      marginRight: '12px',
                      fontSize: '18px'
                    }}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(plan)}
                disabled={plan.id === 'free' || purchasing === plan.id}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: plan.id === 'free' ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                  background: plan.id === 'free' 
                    ? '#f3f4f6' 
                    : plan.popular 
                      ? '#7c3aed' 
                      : '#1f2937',
                  color: plan.id === 'free' 
                    ? '#9ca3af' 
                    : 'white',
                  opacity: purchasing === plan.id ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (plan.id !== 'free' && purchasing !== plan.id) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (plan.id !== 'free' && purchasing !== plan.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {purchasing === plan.id ? (
                  'Processing...'
                ) : plan.id === 'free' ? (
                  'Current Plan'
                ) : (
                  `Upgrade to ${plan.name}`
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Current Usage - Moved Below Plans */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '48px',
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

        {/* FAQ Section */}
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
            Frequently Asked Questions
          </h2>
          <div style={{
            display: 'grid',
            gap: '24px'
          }}>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>
                How do credits work?
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Each time you create a website using our wizard, 1 credit is deducted from your account. 
                Credits don't expire and can be used anytime.
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>
                Can I upgrade or downgrade my plan?
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Yes! You can upgrade your plan at any time to get more credits. 
                Credits are added immediately upon purchase.
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>
                What happens if I run out of credits?
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                When you run out of credits, you won't be able to create new websites until you purchase more. 
                Your existing websites will remain accessible.
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>
                What will happen if I won't renew my plan for next month?
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                If you don't want to purchase next month's plan, your credits will stay with your account and you can use them whenever you want. 
                Once your credits reach zero, you'll need to purchase again in order to get more credits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ConditionalLayout>
  );
}
