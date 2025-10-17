"use client";

import { useState, useEffect } from 'react';
import ConditionalLayout from '../components/conditional-layout';
import { useSession } from 'next-auth/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Affordable Website Builder Plans | Create A Website Click',
  description: 'Choose the perfect plan for your business. Start free with 1 credit or upgrade to create multiple professional websites. Transparent pricing, no hidden fees.',
  keywords: 'website builder pricing, business website plans, affordable website builder, website creation credits',
  openGraph: {
    title: 'Pricing - Affordable Website Builder Plans | Create A Website Click',
    description: 'Choose the perfect plan for your business. Start free with 1 credit or upgrade to create multiple professional websites. Transparent pricing, no hidden fees.',
    type: 'website',
  },
  twitter: {
    title: 'Pricing - Affordable Website Builder Plans | Create A Website Click',
    description: 'Choose the perfect plan for your business. Start free with 1 credit or upgrade to create multiple professional websites. Transparent pricing, no hidden fees.',
    card: 'summary_large_image',
  },
};

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
    id: 'starter',
    name: 'Starter Pack',
    price: 49,
    credits: 5,
    features: [
      '5 Website Builds',
      'Premium Templates',
      'Priority Support'
    ],
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    price: 129,
    credits: 30,
    features: [
      '30 Website Builds',
      'All Templates',
      'Priority Support',
      'Custom Branding'
    ]
  }
];

export default function PricingPage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    // Load user from NextAuth session
    if (status === 'authenticated' && session?.user) {
      setUser({
        email: session.user.email,
        name: session.user.name,
        id: (session.user as any).id
      });
    }
  }, [session, status]);

  const handlePurchase = async (plan: Plan) => {
    if (plan.id === 'free') return;
    
    if (!user) {
      // Redirect to login for non-authenticated users
      window.location.href = '/login?redirect=/pricing';
      return;
    }
    
    setPurchasing(plan.id);
    
    try {
      // Create Cashfree payment order
      const response = await fetch('/api/payments/cashfree/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: plan.id,
          userEmail: user.email,
          userId: user.id
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.paymentUrl) {
          // Redirect to Cashfree payment page
          window.location.href = result.paymentUrl;
        } else {
          alert('❌ Error: Failed to create payment order');
        }
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.error || 'Payment creation failed'}`);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('❌ An error occurred during purchase. Please try again.');
    } finally {
      setPurchasing(null);
    }
  };


  return (
    <ConditionalLayout>
      <div className="bg-background text-text-primary overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-16 px-8 bg-surface text-text-primary">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your <span className="text-gradient">Perfect Plan</span>
            </h1>
            <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12">
              Build professional websites with our AI-powered platform. 
              Choose the plan that fits your needs and start creating today.
            </p>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 px-8 bg-background text-text-primary">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-surface border rounded-lg p-8 h-full flex flex-col relative transition-all duration-300 hover:shadow-card ${
                    plan.popular 
                      ? 'border-accent/50 shadow-glow scale-105' 
                      : 'border-text-muted/20'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 -right-3 bg-accent text-background px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-text-primary mb-4">
                      {plan.name}
                    </h3>
                    <div className="text-5xl font-bold text-accent mb-2">
                      ${plan.price}
                    </div>
                    <div className="text-text-secondary">
                      {plan.credits} Website{plan.credits !== 1 ? 's' : ''}
                    </div>
                  </div>

                  <div className="flex-grow mb-8">
                    <ul className="space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handlePurchase(plan)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      plan.id === 'free'
                        ? 'bg-text-muted text-text-primary cursor-default'
                        : plan.popular
                        ? 'bg-accent text-background hover:shadow-glow'
                        : 'bg-primary text-white hover:bg-primary-600'
                    }`}
                    disabled={plan.id === 'free' || purchasing === plan.id}
                  >
                    {plan.id === 'free' ? 'Current Plan' : 
                     purchasing === plan.id ? (
                       <>
                         <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         Processing...
                       </>
                     ) : user ? 'Choose Plan' : 'Sign Up to Purchase'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section - Matching Homepage */}
        <section className="py-16 px-8 bg-surface text-text-primary">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Trusted by <span className="text-gradient">Thousands</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                Join thousands of satisfied customers who have built their websites with us
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  5,000+
                </div>
                <div className="text-base text-text-secondary font-medium">
                  Websites Created
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  4.9/5
                </div>
                <div className="text-base text-text-secondary font-medium">
                  Customer Rating
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  8 Min
                </div>
                <div className="text-base text-text-secondary font-medium">
                  Average Build Time
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  99.9%
                </div>
                <div className="text-base text-text-secondary font-medium">
                  Uptime Guarantee
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-8 bg-background text-text-primary">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Why Choose <span className="text-gradient">Create A Website Click?</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                Experience the power of AI-driven website creation with our comprehensive platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  🚀
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Lightning Fast
                </h3>
                <p className="text-text-secondary">
                  Build professional websites in just 8 minutes with our AI-powered platform
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  🤖
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  AI-Powered
                </h3>
                <p className="text-text-secondary">
                  Generate professional content, images, and layouts tailored to your business
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  📱
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Mobile Ready
                </h3>
                <p className="text-text-secondary">
                  Every website is automatically optimized for all devices and screen sizes
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  🔒
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Secure & Reliable
                </h3>
                <p className="text-text-secondary">
                  Enterprise-grade security with 99.9% uptime guarantee and free SSL certificates
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-8 bg-surface text-text-primary">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                Everything you need to know about our pricing and platform
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-background border border-text-muted/20 rounded-lg p-8 hover:shadow-card transition-all duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  How do credits work?
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Each time you create a website using our wizard, 1 credit is deducted from your account. 
                  Credits don't expire and can be used anytime. You can purchase additional credits or upgrade your plan whenever needed.
                </p>
              </div>

              <div className="bg-background border border-text-muted/20 rounded-lg p-8 hover:shadow-card transition-all duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Can I upgrade or downgrade my plan?
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Yes! You can upgrade or downgrade your plan at any time. 
                  Changes take effect immediately and unused credits are carried over to your new plan.
                </p>
              </div>

              <div className="bg-background border border-text-muted/20 rounded-lg p-8 hover:shadow-card transition-all duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  What happens if I run out of credits?
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  You can purchase additional credits or upgrade your plan anytime. 
                  Your existing websites remain active even if you run out of credits, so you won't lose any work.
                </p>
              </div>

              <div className="bg-background border border-text-muted/20 rounded-lg p-8 hover:shadow-card transition-all duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Is there a free trial?
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Yes! Our free plan includes 1 website build so you can try our platform 
                  before committing to a paid plan. No credit card required for the free plan.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ConditionalLayout>
  );
}
