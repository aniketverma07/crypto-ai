import { NextResponse } from 'next/server';

function generateMockHistoricalData(timeframe: string) {
  const dataPoints = 100;
  const basePrice = 52000;
  const volatility = 2000;
  
  return Array(dataPoints).fill(0).map((_, i) => {
    const trend = Math.sin(i / 20) * volatility;
    const noise = (Math.random() - 0.5) * volatility * 0.5;
    return basePrice + trend + noise;
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const interval = searchParams.get('interval');

  if (!symbol || !interval) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  // For now, return mock data
  return NextResponse.json({
    data: generateMockHistoricalData(interval)
  });
}
