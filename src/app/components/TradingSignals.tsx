"use client";

import { useEffect, useState } from 'react';
import { fetchTradingSignals } from '../services/api';
import { IoTrendingUpOutline, IoTrendingDownOutline } from 'react-icons/io5';

interface TradingSignal {
  type: 'buy' | 'sell';
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  indicators: string[];
}

interface TradingSignalsProps {
  selectedCoin: string;
}

export default function TradingSignals({ selectedCoin }: TradingSignalsProps) {
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSignal, setExpandedSignal] = useState<number | null>(null);

  useEffect(() => {
    const loadSignals = async () => {
      setLoading(true);
      try {
        const data = await fetchTradingSignals(selectedCoin);
        setSignals(data);
        setExpandedSignal(null); // Reset expanded state on coin change
      } catch (error) {
        console.error('Error loading trading signals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSignals();
  }, [selectedCoin]);

  if (loading) {
    return (
      <div className="bg-[#1A1B1E] rounded-xl p-4 h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (signals.length === 0) {
    return (
      <div className="bg-[#1A1B1E] rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Trading Signals</h2>
        <div className="text-center text-gray-400 py-8">
          No signals available for {selectedCoin}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1B1E] rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Trading Signals</h2>
      <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
        {signals.map((signal, index) => (
          <div
            key={index}
            className="p-3 bg-[#2A2C32] rounded-xl hover:bg-[#313438] transition-colors cursor-pointer"
            onClick={() => setExpandedSignal(expandedSignal === index ? null : index)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#1A1B1E] rounded-lg flex items-center justify-center">
                {signal.type === 'buy' ? (
                  <IoTrendingUpOutline className="w-5 h-5 text-[#22C55E]" />
                ) : (
                  <IoTrendingDownOutline className="w-5 h-5 text-[#EF4444]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className={`font-medium truncate mr-2 ${
                    signal.type === 'buy' ? 'text-[#22C55E]' : 'text-[#EF4444]'
                  }`}>
                    {signal.title}
                  </div>
                  <div className="text-sm text-gray-400 flex-shrink-0">
                    {signal.timeframe}
                  </div>
                </div>
                <div className={`text-sm text-gray-400 ${
                  expandedSignal === index ? '' : 'line-clamp-2'
                }`}>
                  {signal.description}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                  <div className="flex flex-wrap gap-1">
                    {signal.indicators.map((indicator, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-[#1A1B1E] rounded text-xs text-purple-500 whitespace-nowrap"
                      >
                        {indicator}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-xs text-gray-400">Confidence</div>
                    <div className={`text-xs font-medium ${
                      signal.type === 'buy' ? 'text-[#22C55E]' : 'text-[#EF4444]'
                    }`}>
                      {signal.confidence}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1A1B1E;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2A2C32;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #313438;
        }
      `}</style>
    </div>
  );
}
