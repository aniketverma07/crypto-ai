import { NextResponse } from 'next/server';

const mockMarketData = {
  momentum: {
    value: 2.3,
    status: 'Bullish',
    description: 'Strong buying pressure across major pairs'
  },
  volume: {
    value: 24.8,
    change: 16.4,
    description: '24h volume showing significant increase'
  },
  volatility: {
    value: -5.2,
    status: 'Moderate',
    description: 'Decreasing volatility in last 8 hours'
  },
  confidence: {
    value: 85,
    description: 'High confidence in current market predictions'
  }
};

const mockSentimentData = {
  value: 65,
  classification: "Greed",
  timestamp: "2024-02-25T00:00:00Z"
};

export async function GET() {
  return NextResponse.json({
    market: mockMarketData,
    sentiment: mockSentimentData
  });
}
