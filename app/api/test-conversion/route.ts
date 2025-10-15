import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const currency = searchParams.get('currency') || 'USD';
    const amount = parseFloat(searchParams.get('amount') || '49');

    console.log('Testing conversion for:', { currency, amount });

    // Test the same conversion logic
    let convertedPrice;
    try {
      console.log('Attempting to fetch real-time exchange rates...');
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'CreateAWebsiteClick/1.0'
        }
      });
      
      console.log('Exchange rate API response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Exchange rate API data received');
        const inrRate = data.rates['INR'] || 88.7;
        convertedPrice = Math.round(amount * inrRate);
        console.log('Real-time INR conversion successful:', {
          usdPrice: amount,
          inrRate,
          convertedPrice
        });
      } else {
        throw new Error(`API failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching real-time rates, using fallback:', error);
      const inrRate = 88.7;
      convertedPrice = Math.round(amount * inrRate);
      console.log('Using fallback INR rate:', inrRate, 'Converted price:', convertedPrice);
    }
    
    // Ensure we always have a valid INR amount
    if (!convertedPrice || convertedPrice <= 0) {
      console.error('Invalid converted price, using fallback');
      const inrRate = 88.7;
      convertedPrice = Math.round(amount * inrRate);
      console.log('Force fallback conversion:', convertedPrice);
    }

    return NextResponse.json({
      success: true,
      originalAmount: amount,
      originalCurrency: currency,
      convertedAmount: convertedPrice,
      convertedCurrency: 'INR',
      calculation: `${amount} * 88.7 = ${Math.round(amount * 88.7)}`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Conversion test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Conversion test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}