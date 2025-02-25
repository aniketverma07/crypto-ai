import axios from 'axios';

const COINMARKETCAP_API_KEY = process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY;
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const COINMARKETCAP_BASE_URL = 'https://pro-api.coinmarketcap.com/v1';
const GEMINI_BASE_URL = 'https://api.gemini.com/v1';

export interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
      percent_change_24h: number;
    };
  };
}

export async function fetchCryptoData(): Promise<CryptoData[]> {
  const response = await fetch('/api/crypto');
  return response.json();
}

// Mock data for development
const mockHistoricalData = (symbol: string) => ({
  data: Array.from({ length: 30 }, (_, i) => {
    const basePrice = {
      'BTC': 40000,
      'ETH': 2200,
      'BNB': 300,
      'SOL': 95,
      'XRP': 0.50,
    }[symbol] || 100;

    return {
      timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
      price: basePrice + (Math.random() - 0.5) * basePrice * 0.1 // 10% variation
    };
  })
});

export async function fetchCryptoHistoricalData(symbol: string, _timeframe: string) {
  // In production, replace with actual API call
  return mockHistoricalData(symbol);
}

export async function fetchMarketAnalysis() {
  return {
    marketCap: "$2.1T",
    volume24h: "$98.4B",
    btcDominance: "42.3%",
    marketSentiment: "Bullish",
  };
}

export async function fetchMarketSentiment(symbol: string) {
  const response = await fetch(`/api/market/sentiment?symbol=${symbol}`);
  return response.json();
}

export async function fetchTradingSignals(symbol: string = 'BTC') {
  const signals = {
    'BTC': [
      {
        type: "buy",
        title: "BTC Breakout Signal",
        description: "Bitcoin showing strong momentum above key resistance",
        confidence: 85,
        timeframe: "4h",
        indicators: ["RSI", "MACD", "MA Cross"]
      },
      {
        type: "sell",
        title: "BTC Overbought",
        description: "Bitcoin reaching overbought levels on multiple timeframes",
        confidence: 75,
        timeframe: "1h",
        indicators: ["RSI", "Stochastic", "Volume"]
      },
      {
        type: "buy",
        title: "Golden Cross Forming",
        description: "50 EMA about to cross above 200 EMA with strong volume",
        confidence: 82,
        timeframe: "1d",
        indicators: ["Moving Averages", "Volume", "Trend"]
      },
      {
        type: "buy",
        title: "Wyckoff Accumulation",
        description: "Price action suggests institutional accumulation phase",
        confidence: 78,
        timeframe: "12h",
        indicators: ["Volume", "Price Action", "Market Structure"]
      }
    ],
    'ETH': [
      {
        type: "buy",
        title: "ETH Accumulation",
        description: "Ethereum showing accumulation pattern at support",
        confidence: 82,
        timeframe: "4h",
        indicators: ["Volume", "RSI", "Support"]
      },
      {
        type: "sell",
        title: "Gas Price Spike",
        description: "High gas fees indicating potential short-term top",
        confidence: 73,
        timeframe: "1h",
        indicators: ["Gas", "Price Action", "Volume"]
      },
      {
        type: "buy",
        title: "DeFi Season",
        description: "Increasing ETH locked in DeFi protocols",
        confidence: 77,
        timeframe: "1d",
        indicators: ["TVL", "Volume", "DeFi Metrics"]
      },
      {
        type: "buy",
        title: "Staking Momentum",
        description: "Rising ETH 2.0 staking deposits signaling confidence",
        confidence: 84,
        timeframe: "1d",
        indicators: ["Staking", "Network", "Sentiment"]
      }
    ],
    'BNB': [
      {
        type: "sell",
        title: "BNB Resistance",
        description: "BNB approaching major resistance level",
        confidence: 78,
        timeframe: "1d",
        indicators: ["Price Action", "Volume", "Fibonacci"]
      },
      {
        type: "buy",
        title: "Exchange Volume",
        description: "Increasing trading volume on Binance platform",
        confidence: 81,
        timeframe: "4h",
        indicators: ["Volume", "Exchange Metrics", "Flow"]
      },
      {
        type: "buy",
        title: "BSC Growth",
        description: "Rising activity on Binance Smart Chain",
        confidence: 79,
        timeframe: "1d",
        indicators: ["Network", "DApps", "TVL"]
      },
      {
        type: "sell",
        title: "Token Burns",
        description: "Quarterly BNB burn approaching, potential volatility",
        confidence: 76,
        timeframe: "1w",
        indicators: ["Supply", "Events", "Historical"]
      }
    ],
    'SOL': [
      {
        type: "buy",
        title: "SOL Breakout",
        description: "Solana forming bullish pattern with increasing volume",
        confidence: 80,
        timeframe: "4h",
        indicators: ["Volume", "Pattern", "Momentum"]
      },
      {
        type: "buy",
        title: "NFT Volume",
        description: "Surge in Solana NFT marketplace activity",
        confidence: 83,
        timeframe: "1d",
        indicators: ["NFT", "Volume", "Social"]
      },
      {
        type: "sell",
        title: "Network Load",
        description: "High network congestion, monitor TPS",
        confidence: 72,
        timeframe: "1h",
        indicators: ["Network", "TPS", "Load"]
      },
      {
        type: "buy",
        title: "DeFi Integration",
        description: "New DeFi protocols launching on Solana",
        confidence: 77,
        timeframe: "1d",
        indicators: ["DeFi", "Growth", "Development"]
      }
    ],
    'XRP': [
      {
        type: "buy",
        title: "XRP Support",
        description: "XRP bouncing from major support level",
        confidence: 77,
        timeframe: "1d",
        indicators: ["Support", "RSI", "Volume"]
      },
      {
        type: "sell",
        title: "Regulatory News",
        description: "Upcoming regulatory announcements expected",
        confidence: 74,
        timeframe: "1w",
        indicators: ["News", "Events", "Sentiment"]
      },
      {
        type: "buy",
        title: "ODL Growth",
        description: "Increasing On-Demand Liquidity usage",
        confidence: 81,
        timeframe: "1d",
        indicators: ["ODL", "Volume", "Utility"]
      },
      {
        type: "buy",
        title: "Partnership Signal",
        description: "New banking partnerships in development",
        confidence: 79,
        timeframe: "1w",
        indicators: ["News", "Adoption", "Institutional"]
      }
    ]
  };

  return signals[symbol as keyof typeof signals] || [];
}

export async function fetchTradingTips() {
  return [
    {
      category: "strategy",
      tip: "Use stop-loss orders to protect your capital"
    },
    {
      category: "risk",
      tip: "Never invest more than you can afford to lose"
    },
    {
      category: "technical",
      tip: "Watch for divergence between price and RSI"
    },
    {
      category: "psychology",
      tip: "Stick to your trading plan, avoid emotional decisions"
    }
  ];
}

const timeframeToInterval = (timeframe: string): string => {
  switch (timeframe) {
    case '1H':
      return '1m';
    case '24H':
      return '5m';
    case '7D':
      return '1h';
    case '1M':
      return '1d';
    case '1Y':
      return '1w';
    case 'ALL':
      return '1M';
    default:
      return '5m';
  }
};
