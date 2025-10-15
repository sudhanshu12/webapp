import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'Deployment test successful',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    test: 'This should show if deployment is working'
  });
}
