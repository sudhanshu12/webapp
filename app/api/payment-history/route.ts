import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    console.log('Fetching payment history for user:', userId);

    // Get completed purchases
    const { data: purchases, error: purchasesError } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (purchasesError) {
      console.error('Error fetching purchases:', purchasesError);
      return NextResponse.json({ error: 'Failed to fetch purchases' }, { status: 500 });
    }

    // Get payment orders (for Cashfree payments)
    const { data: paymentOrders, error: ordersError } = await supabase
      .from('payment_orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error('Error fetching payment orders:', ordersError);
    }

    // Get credit transactions
    const { data: transactions, error: transactionsError } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (transactionsError) {
      console.error('Error fetching credit transactions:', transactionsError);
    }

    // Combine and format payment history
    const paymentHistory = [];

    // Add purchases
    if (purchases) {
      purchases.forEach(purchase => {
        paymentHistory.push({
          id: purchase.id,
          type: 'purchase',
          date: purchase.created_at,
          amount: purchase.amount_paid,
          currency: purchase.currency,
          credits: purchase.credits_purchased,
          package: purchase.package_id,
          paymentMethod: purchase.payment_method,
          status: purchase.status,
          orderId: purchase.order_id,
          transactionId: purchase.transaction_id
        });
      });
    }

    // Add payment orders (if not already in purchases)
    if (paymentOrders) {
      paymentOrders.forEach(order => {
        // Check if this order is already in purchases
        const existsInPurchases = purchases?.some(p => p.order_id === order.order_id);
        
        if (!existsInPurchases && order.payment_status === 'SUCCESS') {
          const credits = order.package_id === 'starter' ? 5 : 30;
          paymentHistory.push({
            id: order.id,
            type: 'payment_order',
            date: order.created_at,
            amount: order.amount,
            currency: order.currency,
            credits: credits,
            package: order.package_id,
            paymentMethod: 'cashfree',
            status: order.payment_status,
            orderId: order.order_id,
            transactionId: order.cashfree_order_id
          });
        }
      });
    }

    // Add credit transactions
    if (transactions) {
      transactions.forEach(transaction => {
        paymentHistory.push({
          id: transaction.id,
          type: 'credit_transaction',
          date: transaction.created_at,
          amount: 0,
          currency: 'N/A',
          credits: transaction.amount,
          package: 'manual',
          paymentMethod: transaction.type,
          status: 'completed',
          orderId: 'N/A',
          transactionId: 'N/A',
          description: transaction.description
        });
      });
    }

    // Sort by date (newest first)
    paymentHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log(`Found ${paymentHistory.length} payment history records for user ${userId}`);

    return NextResponse.json({
      success: true,
      userId,
      paymentHistory,
      totalRecords: paymentHistory.length
    });

  } catch (error) {
    console.error('Payment history error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch payment history',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
