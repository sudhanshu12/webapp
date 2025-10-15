import { NextRequest, NextResponse } from 'next/server';
import { paymentPackages } from '@/lib/cashfree';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const starterPackage = paymentPackages.starter;
    
    return NextResponse.json({
      package: starterPackage,
      hasPriceUSD: 'priceUSD' in starterPackage,
      priceUSD: starterPackage.priceUSD,
      allKeys: Object.keys(starterPackage)
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
