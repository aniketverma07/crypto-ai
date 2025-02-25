import { NextResponse } from 'next/server';

const mockSignals = [
  {
    id: 1,
    coin: 'BTC',
    type: 'buy',
    price: 52345.20,
    target: 54000.00,
    stopLoss: 51500.00,
    timeframe: '4H'
  },
  {
    id: 2,
    coin: 'ETH',
    type: 'sell',
    price: 3744.56,
    target: 3600.00,
    stopLoss: 3850.00,
    timeframe: '1D'
  },
  {
    id: 3,
    coin: 'SOL',
    type: 'neutral',
    price: 124.56,
    target: 130.00,
    stopLoss: 120.00,
    timeframe: '1H'
  }
];

export async function GET() {
  try {
    return new NextResponse(JSON.stringify(mockSignals), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in /api/trading/signals:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
