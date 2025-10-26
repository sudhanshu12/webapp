import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { paymentPackages } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { userId, orderId, packageId = 'starter' } = await req.json();

    if (!userId || !orderId) {
      return NextResponse.json({ error: 'User ID and Order ID are required' }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin client not initialized' }, { status: 500 });
    }

    const selectedPackage = paymentPackages[packageId as keyof typeof paymentPackages];
    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    console.log('Creating purchase record:', {
      userId,
      orderId,
      packageId,
      credits: selectedPackage.credits
    });

    // Create purchase record
    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .insert({
        user_id: userId,
        package_id: packageId,
        credits_purchased: selectedPackage.credits,
        amount_paid: selectedPackage.priceUSD,
        currency: 'USD',
        order_id: orderId,
        transaction_id: `manual_txn_${Date.now()}`,
        payment_method: 'manual_fix',
        status: 'completed',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (purchaseError) {
      console.error('Error creating purchase record:', purchaseError);
      return NextResponse.json({ error: 'Failed to create purchase record', details: purchaseError.message }, { status: 500 });
    }

    console.log('Purchase record created:', purchase);

    return NextResponse.json({
      success: true,
      message: 'Purchase record created successfully',
      purchase
    });

  } catch (error) {
    console.error('Create purchase record error:', error);
    return NextResponse.json({ 
      error: 'Failed to create purchase record',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
