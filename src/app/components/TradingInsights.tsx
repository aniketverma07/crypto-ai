"use client";

import { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { IoFlashOutline, IoTrendingUpOutline, IoTrendingDownOutline, IoPricetagOutline, IoStopCircleOutline } from 'react-icons/io5';

interface TradingInsight {
  type: 'entry' | 'exit' | 'risk' | 'opportunity';
  title: string;
  description: string;
  levels?: {
    entry?: number;
    target?: number;
    stop?: number;
  };
  confidence: number;
  timeframe: string;
}

export default function TradingInsights() {
  const { selectedCoin } = useCrypto();
  const [insights, setInsights] = useState<TradingInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        // Mock data - in real app, fetch from API
        const mockInsights: TradingInsight[] = [
          {
            type: 'entry',
            title: 'Potential Long Entry',
            description: 'Price approaching major support level with RSI oversold conditions. Volume showing accumulation pattern.',
            levels: {
              entry: 48250,
              target: 51000,
              stop: 47500
            },
            confidence: 85,
            timeframe: '4H'
          },
          {
            type: 'risk',
            title: 'Key Risk Levels',
            description: 'Major resistance at $52,000. Breaking this level could trigger a short squeeze.',
            levels: {
              entry: 52000,
              target: 54000,
              stop: 51000
            },
            confidence: 75,
            timeframe: '1D'
          },
          {
            type: 'opportunity',
            title: 'Breakout Setup',
            description: 'Forming bullish flag pattern with decreasing volume. Watch for breakout confirmation.',
            confidence: 70,
            timeframe: '1H'
          }
        ];
        setInsights(mockInsights);
      } catch (error) {
        console.error('Error fetching trading insights:', error);
      }
      setLoading(false);
    };

    fetchInsights();
  }, [selectedCoin]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'entry':
        return <IoTrendingUpOutline className="w-5 h-5 text-[#22C55E]" />;
      case 'exit':
        return <IoTrendingDownOutline className="w-5 h-5 text-[#EF4444]" />;
      case 'risk':
        return <IoStopCircleOutline className="w-5 h-5 text-[#F59E0B]" />;
      case 'opportunity':
        return <IoFlashOutline className="w-5 h-5 text-[#6C5DD3]" />;
      default:
        return <IoPricetagOutline className="w-5 h-5 text-[#6C5DD3]" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'entry':
        return 'text-[#22C55E]';
      case 'exit':
        return 'text-[#EF4444]';
      case 'risk':
        return 'text-[#F59E0B]';
      case 'opportunity':
        return 'text-[#6C5DD3]';
      default:
        return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1A1B1E] rounded-xl p-4 mt-4">
        <div className="animate-pulse">
          <div className="h-6 bg-[#2A2C32] rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-24 bg-[#2A2C32] rounded"></div>
            <div className="h-24 bg-[#2A2C32] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1B1E] rounded-xl p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4">Trading Insights</h2>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="p-4 bg-[#2A2C32] rounded-xl hover:bg-[#313438] transition-colors">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#1A1B1E] rounded-lg flex items-center justify-center">
                {getIcon(insight.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className={`font-medium ${getColor(insight.type)}`}>
                    {insight.title}
                  </div>
                  <div className="text-sm text-gray-400">
                    {insight.timeframe}
                  </div>
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  {insight.description}
                </div>
                {insight.levels && (
                  <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                    {insight.levels.entry && (
                      <div className="p-2 bg-[#1A1B1E] rounded-lg">
                        <div className="text-gray-400">Entry</div>
                        <div className="font-medium">${insight.levels.entry.toLocaleString()}</div>
                      </div>
                    )}
                    {insight.levels.target && (
                      <div className="p-2 bg-[#1A1B1E] rounded-lg">
                        <div className="text-gray-400">Target</div>
                        <div className="font-medium text-[#22C55E]">${insight.levels.target.toLocaleString()}</div>
                      </div>
                    )}
                    {insight.levels.stop && (
                      <div className="p-2 bg-[#1A1B1E] rounded-lg">
                        <div className="text-gray-400">Stop</div>
                        <div className="font-medium text-[#EF4444]">${insight.levels.stop.toLocaleString()}</div>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-400">Confidence</div>
                    <div className="text-sm font-medium">{insight.confidence}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
