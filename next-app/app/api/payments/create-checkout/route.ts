import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutUrl } from '@/lib/lemonsqueezy';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { packageId, userEmail, userId } = await req.json();

    if (!packageId || !userEmail || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get package details
    const packageData = createCheckoutUrl(packageId, userEmail, userId);
    
    if (!packageData) {
      // Free package - no checkout needed
      return NextResponse.json({ 
        success: true, 
        isFree: true,
        message: 'Free package - no payment required'
      });
    }

    // Create checkout URL for paid packages
    const checkoutUrl = createCheckoutUrl(packageId, userEmail, userId);
    
    if (!checkoutUrl) {
      return NextResponse.json({ error: 'Failed to create checkout URL' }, { status: 500 });
    }

    // Store pending purchase in database
    const { data: pendingPurchase, error: insertError } = await supabase
      .from('pending_purchases')
      .insert({
        user_id: userId,
        package_id: packageId,
        user_email: userEmail,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating pending purchase:', insertError);
      return NextResponse.json({ error: 'Failed to create pending purchase' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      checkoutUrl,
      pendingPurchaseId: pendingPurchase.id
    });

  } catch (error) {
    console.error('Payment checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
