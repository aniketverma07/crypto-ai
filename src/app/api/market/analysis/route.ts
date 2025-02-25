import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'BTC';

    // Mock data for demonstration
    const mockAnalysis = {
      momentum: {
        value: 2.3,
        status: 'Bullish',
        description: 'Strong buying pressure with increasing volume'
      },
      volume: {
        value: 24.8,
        change: 16.4,
        description: '24h volume showing significant increase'
      },
      volatility: {
        value: 5.2,
        status: 'Moderate',
        description: 'Market volatility within normal range'
      },
      confidence: {
        value: 85,
        description: 'High confidence in current market trend'
      },
      technicalIndicators: {
        rsi: {
          value: 58,
          signal: 'Neutral',
          description: 'RSI in neutral territory'
        },
        macd: {
          value: 0.45,
          signal: 'Buy',
          description: 'MACD showing bullish crossover'
        },
        movingAverages: {
          ma20: 48250,
          ma50: 47800,
          ma200: 45600,
          signal: 'Strong Buy',
          description: 'Price above all major moving averages'
        }
      },
      marketSentiment: {
        overall: 'Bullish',
        socialMedia: 75,
        newsAnalysis: 68,
        tradingActivity: 82
      }
    };

    // Simulate different analysis for different coins
    if (symbol === 'ETH') {
      mockAnalysis.momentum.value = 1.8;
      mockAnalysis.momentum.status = 'Neutral';
      mockAnalysis.confidence.value = 72;
    } else if (symbol === 'BNB') {
      mockAnalysis.momentum.value = -0.5;
      mockAnalysis.momentum.status = 'Bearish';
      mockAnalysis.confidence.value = 45;
    }

    return new NextResponse(JSON.stringify(mockAnalysis), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in /api/market/analysis:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
