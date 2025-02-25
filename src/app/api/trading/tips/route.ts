import { NextResponse } from 'next/server';

const mockTips = [
  {
    id: 1,
    type: 'signal',
    title: 'BTC Bullish Pattern',
    description: 'Bitcoin showing bullish divergence on 4H timeframe',
    color: 'text-green-500'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Market Volatility',
    description: 'High volatility expected in next 24 hours',
    color: 'text-yellow-500'
  },
  {
    id: 3,
    type: 'info',
    title: 'ETH Gas Fees',
    description: 'ETH gas fees are currently low - good time for transactions',
    color: 'text-blue-500'
  },
  {
    id: 4,
    type: 'signal',
    title: 'SOL Support Level',
    description: 'Solana approaching strong support level',
    color: 'text-purple-500'
  }
];

export async function GET() {
  try {
    return new NextResponse(JSON.stringify(mockTips), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in /api/trading/tips:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
