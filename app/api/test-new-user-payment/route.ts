import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { paymentPackages } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { packageId, paymentMethod = 'test' } = await req.json();

    if (!packageId) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 });
    }

    const selectedPackage = paymentPackages[packageId as keyof typeof paymentPackages];
    if (!selectedPackage) {
      return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin client not initialized' }, { status: 500 });
    }

    console.log('Testing payment processing for package:', {
      packageId,
      credits: selectedPackage.credits,
      paymentMethod
    });

    // Create a test user first
    const testUserId = `test_user_${Date.now()}`;
    const testEmail = `test_${Date.now()}@example.com`;

    // 1. Create test user
    const { data: newUser, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        id: testUserId,
        email: testEmail,
        first_name: 'Test',
        last_name: 'User',
        provider: 'test',
        email_verified: true,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (userError) {
      console.error('Error creating test user:', userError);
      return NextResponse.json({ error: 'Failed to create test user', details: userError.message }, { status: 500 });
    }

    console.log('Test user created:', newUser);

    // 2. Create initial credits (1 free credit)
    const { data: initialCredits, error: creditsError } = await supabaseAdmin
      .from('user_credits')
      .insert({
        user_id: testUserId,
        total_credits: 1,
        used_credits: 0,
        remaining_credits: 1,
        plan_type: 'free',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (creditsError) {
      console.error('Error creating initial credits:', creditsError);
      return NextResponse.json({ error: 'Failed to create initial credits', details: creditsError.message }, { status: 500 });
    }

    console.log('Initial credits created:', initialCredits);

    // 3. Process payment (add package credits)
    const creditsToAdd = selectedPackage.credits;
    const newTotalCredits = 1 + creditsToAdd; // 1 free + package credits
    const newRemainingCredits = 1 + creditsToAdd;

    const { data: updatedCredits, error: updateError } = await supabaseAdmin
      .from('user_credits')
      .update({
        total_credits: newTotalCredits,
        remaining_credits: newRemainingCredits,
        plan_type: packageId, // Changes subscription from 'free' to 'starter'/'pro'
        updated_at: new Date().toISOString()
      })
      .eq('user_id', testUserId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating credits:', updateError);
      return NextResponse.json({ error: 'Failed to update credits', details: updateError.message }, { status: 500 });
    }

    console.log('Credits updated:', updatedCredits);

    // 4. Create purchase record
    const orderId = `test_order_${Date.now()}`;
    const { error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .insert({
        user_id: testUserId,
        package_id: packageId,
        credits_purchased: creditsToAdd,
        amount_paid: selectedPackage.priceUSD,
        currency: 'USD',
        order_id: orderId,
        transaction_id: `test_txn_${Date.now()}`,
        payment_method: paymentMethod,
        status: 'completed',
        created_at: new Date().toISOString()
      });

    if (purchaseError) {
      console.error('Error creating purchase record:', purchaseError);
      return NextResponse.json({ error: 'Failed to create purchase record', details: purchaseError.message }, { status: 500 });
    }

    console.log(`Test payment processed successfully: ${creditsToAdd} credits added to test user ${testUserId}`);

    return NextResponse.json({
      success: true,
      message: `Test payment processed successfully. Added ${creditsToAdd} credits.`,
      testUser: {
        id: testUserId,
        email: testEmail
      },
      credits: updatedCredits,
      creditsAdded: creditsToAdd,
      planChanged: true,
      package: selectedPackage
    });

  } catch (error) {
    console.error('Test payment processing error:', error);
    return NextResponse.json({ 
      error: 'Test payment processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
