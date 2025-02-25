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
    name: "BNB",
    symbol: "BNB",
    quote: {
      USD: {
        price: 312.45,
        volume_24h: 8.2e9,
        market_cap: 48e9,
        percent_change_24h: -0.29
      }
    }
  }
];

export async function GET() {
  // For now, return mock data
  return NextResponse.json(mockData);
}
