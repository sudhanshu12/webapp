import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-openrouter-key')
    
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenRouter API key is required' }, { status: 401 })
    }

    // Get OpenRouter account balance
    const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      balance: data.data?.credit_balance || 0,
      currency: 'USD',
      provider: 'OpenRouter'
    })

  } catch (error: any) {
    console.error('OpenRouter balance check error:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to check OpenRouter balance' 
    }, { status: 500 })
  }
}
