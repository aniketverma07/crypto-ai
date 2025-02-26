"use client";

import { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { IoAnalyticsOutline, IoTrendingUpOutline, IoTrendingDownOutline, IoTimeOutline } from 'react-icons/io5';

interface MarketAnalysisData {
  momentum: {
    value: number;
    status: string;
    description: string;
  };
  volume: {
    value: number;
    change: number;
    description: string;
  };
  volatility: {
    value: number;
    status: string;
    description: string;
  };
  confidence: {
    value: number;
    description: string;
  };
  technicalIndicators: {
    rsi: {
      value: number;
      signal: string;
      description: string;
    };
    macd: {
      value: number;
      signal: string;
      description: string;
    };
    movingAverages: {
      ma20: number;
      ma50: number;
      ma200: number;
      signal: string;
      description: string;
    };
  };
  marketSentiment: {
    overall: string;
    socialMedia: number;
    newsAnalysis: number;
    tradingActivity: number;
  };
}

interface Coin {
  symbol: string;
  name: string;
}

export default function MarketAnalysis({ selectedCoin }: { selectedCoin: Coin | null }) {
  const [analysis, setAnalysis] = useState<MarketAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/market/analysis?symbol=${selectedCoin?.symbol || 'BTC'}`);
        const data = await response.json();
        setAnalysis(data);
      } catch (error) {
        console.error('Error fetching market analysis:', error);
      }
      setLoading(false);
    };

    fetchAnalysis();
  }, [selectedCoin]);

  if (loading || !analysis) {
    return (
      <div className="bg-[#1A1B1E] rounded-xl p-4 mt-4">
        <div className="animate-pulse">
          <div className="h-6 bg-[#2A2C32] rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-[#2A2C32] rounded"></div>
            <div className="h-20 bg-[#2A2C32] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1B1E] rounded-xl p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4">Market Analysis</h2>
      
      {/* Market Momentum */}
      <div className="p-4 bg-[#2A2C32] rounded-xl mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-[#1A1B1E] rounded-lg flex items-center justify-center">
            <IoAnalyticsOutline className="w-5 h-5 text-[#6C5DD3]" />
          </div>
          <div>
            <div className="text-sm text-gray-400">Market Momentum</div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{analysis.momentum.status}</span>
              <span className={`text-sm ${analysis.momentum.value >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                {analysis.momentum.value >= 0 ? '+' : ''}{analysis.momentum.value}%
              </span>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-400">{analysis.momentum.description}</div>
      </div>

      {/* Technical Indicators */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-[#2A2C32] rounded-xl">
          <div className="text-sm text-gray-400 mb-1">RSI</div>
          <div className="font-medium">{analysis.technicalIndicators.rsi.value}</div>
          <div className={`text-sm ${
            analysis.technicalIndicators.rsi.signal === 'Buy' ? 'text-[#22C55E]' :
            analysis.technicalIndicators.rsi.signal === 'Sell' ? 'text-[#EF4444]' :
            'text-gray-400'
          }`}>
            {analysis.technicalIndicators.rsi.signal}
          </div>
        </div>
        <div className="p-3 bg-[#2A2C32] rounded-xl">
          <div className="text-sm text-gray-400 mb-1">MACD</div>
          <div className="font-medium">{analysis.technicalIndicators.macd.value}</div>
          <div className={`text-sm ${
            analysis.technicalIndicators.macd.signal === 'Buy' ? 'text-[#22C55E]' :
            analysis.technicalIndicators.macd.signal === 'Sell' ? 'text-[#EF4444]' :
            'text-gray-400'
          }`}>
            {analysis.technicalIndicators.macd.signal}
          </div>
        </div>
      </div>

      {/* Market Sentiment */}
      <div className="p-4 bg-[#2A2C32] rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-400">Market Sentiment</div>
          <div className={`text-sm font-medium ${
            analysis.marketSentiment.overall === 'Bullish' ? 'text-[#22C55E]' :
            analysis.marketSentiment.overall === 'Bearish' ? 'text-[#EF4444]' :
            'text-gray-400'
          }`}>
            {analysis.marketSentiment.overall}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm">Social Media</div>
            <div className="text-sm font-medium">{analysis.marketSentiment.socialMedia}%</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">News Analysis</div>
            <div className="text-sm font-medium">{analysis.marketSentiment.newsAnalysis}%</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">Trading Activity</div>
            <div className="text-sm font-medium">{analysis.marketSentiment.tradingActivity}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
