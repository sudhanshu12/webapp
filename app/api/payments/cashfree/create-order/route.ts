import { NextRequest, NextResponse } from 'next/server';
import { cashfreeConfig, paymentPackages, CreateOrderRequest, CreateOrderResponse, PAYMENT_METHODS, CURRENCY_PAYMENT_METHODS } from '@/lib/cashfree';
import { supabase } from '@/lib/supabase';
import { Cashfree, CFEnvironment } from 'cashfree-pg';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { packageId, userEmail, userId, currency } = await req.json();

    if (!packageId || !userEmail || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get package details
    const selectedPackage = paymentPackages[packageId as keyof typeof paymentPackages];
    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create order payload for Cashfree
    const orderPayload: CreateOrderRequest = {
      orderId,
      orderAmount: selectedPackage.priceUSD,
      orderCurrency: 'INR',
      customerDetails: {
        customerId: userId,
        customerName: userEmail.split('@')[0], // Use email prefix as name
        customerEmail: userEmail,
        customerPhone: '9999999999' // Default phone number
      },
      orderMeta: {
        returnUrl: `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
        notifyUrl: `${process.env.NEXTAUTH_URL}/api/payments/cashfree/webhook`,
        paymentMethods: 'cc,dc,nb,upi,paypal'
      }
    };

    // Get payment methods based on currency
    const supportedPaymentMethods = CURRENCY_PAYMENT_METHODS[currency] || CURRENCY_PAYMENT_METHODS['INR'];
    
    // Check if we have valid Cashfree credentials
    if (!cashfreeConfig.secretKey && !cashfreeConfig.partnerApiKey) {
      console.error('No Cashfree credentials found');
      return NextResponse.json({ 
        error: 'Payment gateway not configured. Please contact support.',
        details: 'Missing Cashfree credentials'
      }, { status: 500 });
    }
    
    // Initialize Cashfree SDK with partner authentication if available
    let cashfree;
    try {
      if (cashfreeConfig.usePartnerAuth) {
        console.log('Using Cashfree partner authentication');
        // Use partner authentication as per documentation
        cashfree = new Cashfree(
          cashfreeConfig.environment === 'PRODUCTION' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
          cashfreeConfig.partnerApiKey,
          cashfreeConfig.partnerMerchantId
        );
      } else {
        console.log('Using Cashfree regular authentication');
        // Fallback to regular authentication
        cashfree = new Cashfree(
          cashfreeConfig.environment === 'PRODUCTION' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
          cashfreeConfig.appId,
          cashfreeConfig.secretKey
        );
      }
    } catch (sdkError) {
      console.error('Cashfree SDK initialization error:', sdkError);
      return NextResponse.json({ 
        error: 'Payment gateway initialization failed',
        details: sdkError instanceof Error ? sdkError.message : 'SDK initialization error'
      }, { status: 500 });
    }

    // Create order request according to Cashfree documentation
    const orderRequest = {
      order_amount: selectedPackage.priceUSD,
      order_currency: currency || 'INR',
      customer_details: {
        customer_id: userId,
        customer_name: userEmail.split('@')[0],
        customer_email: userEmail,
        customer_phone: '9999999999'
      },
      order_meta: {
        return_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success&order_id=${orderId}`,
        notify_url: `${process.env.NEXTAUTH_URL}/api/payments/cashfree/webhook`,
        payment_methods: supportedPaymentMethods
      },
      order_note: `Payment for ${selectedPackage.name} - ${selectedPackage.credits} credits`
    };

    // Create order using Cashfree SDK
    console.log('Creating Cashfree order with request:', orderRequest);
    
    try {
      const cashfreeResponse = await cashfree.PGCreateOrder(orderRequest);
      console.log('Cashfree response:', cashfreeResponse);

      if (!cashfreeResponse || !cashfreeResponse.data) {
        console.error('Cashfree SDK error - no data in response:', cashfreeResponse);
        return NextResponse.json({ 
          error: 'Failed to create payment order - no data in response',
          details: cashfreeResponse
        }, { status: 500 });
      }

      const cashfreeData = cashfreeResponse.data;
      console.log('Cashfree order data:', cashfreeData);

      if (!cashfreeData.payment_session_id) {
        console.error('No payment session ID in response:', cashfreeData);
        return NextResponse.json({ 
          error: 'No payment session ID received from Cashfree',
          details: cashfreeData
        }, { status: 500 });
      }

    // Store order in database for tracking (optional - don't fail if table doesn't exist)
    try {
      const { error: dbError } = await supabase
        .from('payment_orders')
        .insert({
          order_id: orderId,
          user_id: userId,
          user_email: userEmail,
          package_id: packageId,
          amount: selectedPackage.priceUSD,
          currency: 'INR',
          status: 'PENDING',
          cashfree_order_id: cashfreeData.cf_order_id,
          payment_session_id: cashfreeData.payment_session_id,
          created_at: new Date().toISOString()
        });

      if (dbError) {
        console.error('Database error (non-critical):', dbError);
        // Don't fail the request, just log the error
      }
    } catch (dbError) {
      console.error('Database table may not exist yet:', dbError);
      // Continue with payment even if database storage fails
    }

      // Return payment session ID for frontend integration
      return NextResponse.json({
        success: true,
        orderId: cashfreeData.cf_order_id,
        paymentSessionId: cashfreeData.payment_session_id,
        amount: selectedPackage.priceUSD,
        currency: currency || 'INR'
      });

    } catch (cashfreeError) {
      console.error('Cashfree SDK error:', cashfreeError);
      return NextResponse.json({ 
        error: 'Cashfree payment creation failed',
        details: cashfreeError instanceof Error ? cashfreeError.message : 'Unknown error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
