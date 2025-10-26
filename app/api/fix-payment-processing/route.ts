import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { paymentPackages } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email, orderIds, packageId = 'starter' } = await req.json();

    if (!email || !orderIds || !Array.isArray(orderIds)) {
      return NextResponse.json({ error: 'Email and Order IDs array are required' }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin client not initialized' }, { status: 500 });
    }

    const selectedPackage = paymentPackages[packageId as keyof typeof paymentPackages];
    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    console.log('Fixing payment processing for:', {
      email,
      orderIds,
      packageId,
      credits: selectedPackage.credits
    });

    // 1. Check if user exists
    const { data: existingUser, error: userCheckError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    let userId;

    if (userCheckError && userCheckError.code === 'PGRST116') {
      // User doesn't exist, create them
      console.log('User does not exist, creating new user:', email);
      
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { data: newUser, error: createUserError } = await supabaseAdmin
        .from('users')
        .insert({
          id: userId,
          email: email,
          first_name: email.split('@')[0],
          last_name: 'User',
          provider: 'manual_fix',
          email_verified: true,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (createUserError) {
        console.error('Error creating user:', createUserError);
        return NextResponse.json({ error: 'Failed to create user', details: createUserError.message }, { status: 500 });
      }

      console.log('User created successfully:', newUser);
    } else if (userCheckError) {
      console.error('Error checking user:', userCheckError);
      return NextResponse.json({ error: 'Failed to check user', details: userCheckError.message }, { status: 500 });
    } else {
      // User exists
      userId = existingUser.id;
      console.log('User exists:', existingUser);
    }

    // 2. Calculate total credits needed (1 free + package credits for each order)
    const creditsPerOrder = selectedPackage.credits;
    const totalCreditsToAdd = orderIds.length * creditsPerOrder;
    const totalCredits = 1 + totalCreditsToAdd; // 1 free + all package credits
    const remainingCredits = totalCredits;

    console.log('Credit calculation:', {
      orders: orderIds.length,
      creditsPerOrder,
      totalCreditsToAdd,
      totalCredits,
      remainingCredits
    });

    // 3. Create or update user credits
    const { data: updatedCredits, error: updateCreditsError } = await supabaseAdmin
      .from('user_credits')
      .upsert({
        user_id: userId,
        total_credits: totalCredits,
        used_credits: 0,
        remaining_credits: remainingCredits,
        plan_type: packageId, // Changes subscription from 'free' to 'starter'/'pro'
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (updateCreditsError) {
      console.error('Error updating credits:', updateCreditsError);
      return NextResponse.json({ error: 'Failed to update credits', details: updateCreditsError.message }, { status: 500 });
    }

    console.log('Credits updated:', updatedCredits);

    // 4. Create purchase records for each order
    const purchaseResults = [];
    
    for (const orderId of orderIds) {
      const { error: purchaseError } = await supabaseAdmin
        .from('purchases')
        .insert({
          user_id: userId,
          package_id: packageId,
          credits_purchased: creditsPerOrder,
          amount_paid: selectedPackage.priceUSD,
          currency: 'USD',
          order_id: orderId,
          transaction_id: `fix_txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          payment_method: 'manual_fix',
          status: 'completed',
          created_at: new Date().toISOString()
        });

      if (purchaseError) {
        console.error(`Error creating purchase record for ${orderId}:`, purchaseError);
        purchaseResults.push({ orderId, success: false, error: purchaseError.message });
      } else {
        console.log(`Purchase record created for ${orderId}`);
        purchaseResults.push({ orderId, success: true });
      }
    }

    console.log(`Payment processing completed for ${email}: ${totalCreditsToAdd} credits added across ${orderIds.length} orders`);

    return NextResponse.json({
      success: true,
      message: `Payment processing completed for ${email}. Added ${totalCreditsToAdd} credits across ${orderIds.length} orders.`,
      user: {
        id: userId,
        email: email
      },
      credits: updatedCredits,
      creditsAdded: totalCreditsToAdd,
      planChanged: true,
      package: selectedPackage,
      ordersProcessed: orderIds.length,
      purchaseResults
    });

  } catch (error) {
    console.error('Fix payment processing error:', error);
    return NextResponse.json({ 
      error: 'Failed to fix payment processing',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
