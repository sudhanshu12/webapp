import { NextRequest, NextResponse } from 'next/server';
import { fetchExchangeRates, getCurrencyWithRealTimeRate } from '@/lib/currency';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const currency = searchParams.get('currency') || 'USD';
    const amount = parseFloat(searchParams.get('amount') || '49');

    // Get real-time currency rate
    const currencyInfo = await getCurrencyWithRealTimeRate(currency);
    const convertedAmount = Math.round(amount * currencyInfo.rate * 100) / 100;

    return NextResponse.json({
      success: true,
      originalAmount: amount,
      originalCurrency: 'USD',
      convertedAmount: convertedAmount,
      convertedCurrency: currency,
      exchangeRate: currencyInfo.rate,
      currencySymbol: currencyInfo.symbol,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Currency conversion error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to convert currency',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { amount, fromCurrency = 'USD', toCurrency } = await req.json();

    if (!amount || !toCurrency) {
      return NextResponse.json({
        success: false,
        error: 'Amount and toCurrency are required'
      }, { status: 400 });
    }

    // Get real-time rates
    const rates = await fetchExchangeRates();
    
    // Convert from USD to target currency
    const targetRate = rates[toCurrency] || 1;
    const convertedAmount = Math.round(amount * targetRate * 100) / 100;

    return NextResponse.json({
      success: true,
      originalAmount: amount,
      originalCurrency: fromCurrency,
      convertedAmount: convertedAmount,
      convertedCurrency: toCurrency,
      exchangeRate: targetRate,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Currency conversion error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to convert currency',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
