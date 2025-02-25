import { NextResponse } from 'next/server';

const mockData = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    quote: {
      USD: {
        price: 52345.20,
        volume_24h: 42.8e9,
        market_cap: 1.23e12,
        percent_change_24h: 15.36
      }
    }
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    quote: {
      USD: {
        price: 3744.56,
        volume_24h: 28.4e9,
        market_cap: 450e9,
        percent_change_24h: 12.73
      }
    }
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    quote: {
      USD: {
        price: 124.56,
        volume_24h: 8.2e9,
        market_cap: 42.1e9,
        percent_change_24h: 18.92
      }
    }
  }
];

export async function GET() {
  try {
    return new NextResponse(JSON.stringify(mockData), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in /api/crypto:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
