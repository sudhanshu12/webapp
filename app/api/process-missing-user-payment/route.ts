import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { paymentPackages } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email, orderId, packageId = 'starter' } = await req.json();

    if (!email || !orderId) {
      return NextResponse.json({ error: 'Email and Order ID are required' }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin client not initialized' }, { status: 500 });
    }

    const selectedPackage = paymentPackages[packageId as keyof typeof paymentPackages];
    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    console.log('Processing payment for missing user:', {
      email,
      orderId,
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
          provider: 'manual',
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

    // 2. Create or update user credits
    const creditsToAdd = selectedPackage.credits;
    
    const { data: existingCredits, error: creditsCheckError } = await supabaseAdmin
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    let newTotalCredits = 1 + creditsToAdd; // 1 free + package credits
    let newRemainingCredits = 1 + creditsToAdd;
    let newUsedCredits = 0;

    if (existingCredits) {
      newTotalCredits = existingCredits.total_credits + creditsToAdd;
      newRemainingCredits = existingCredits.remaining_credits + creditsToAdd;
      newUsedCredits = existingCredits.used_credits;
    }

    const { data: updatedCredits, error: updateCreditsError } = await supabaseAdmin
      .from('user_credits')
      .upsert({
        user_id: userId,
        total_credits: newTotalCredits,
        used_credits: newUsedCredits,
        remaining_credits: newRemainingCredits,
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

    // 3. Create purchase record
    const { error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .insert({
        user_id: userId,
        package_id: packageId,
        credits_purchased: creditsToAdd,
        amount_paid: selectedPackage.priceUSD,
        currency: 'USD',
        order_id: orderId,
        transaction_id: `manual_txn_${Date.now()}`,
        payment_method: 'manual_fix',
        status: 'completed',
        created_at: new Date().toISOString()
      });

    if (purchaseError) {
      console.error('Error creating purchase record:', purchaseError);
      return NextResponse.json({ error: 'Failed to create purchase record', details: purchaseError.message }, { status: 500 });
    }

    console.log(`Payment processed successfully for ${email}: ${creditsToAdd} credits added`);

    return NextResponse.json({
      success: true,
      message: `Payment processed successfully for ${email}. Added ${creditsToAdd} credits.`,
      user: {
        id: userId,
        email: email
      },
      credits: updatedCredits,
      creditsAdded: creditsToAdd,
      planChanged: true,
      package: selectedPackage
    });

  } catch (error) {
    console.error('Process missing user payment error:', error);
    return NextResponse.json({ 
      error: 'Failed to process payment',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
