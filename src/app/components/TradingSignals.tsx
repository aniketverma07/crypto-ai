"use client";

import { useState, useEffect } from 'react';
import { IoTrendingUp, IoTrendingDown, IoSwapVertical } from 'react-icons/io5';
import { fetchTradingSignals } from '../services/api';

interface TradingSignal {
  id: number;
  coin: string;
  type: 'buy' | 'sell' | 'neutral';
  price: number;
  target: number;
  stopLoss: number;
  timeframe: string;
}

export default function TradingSignals({ selectedCoin }: { selectedCoin: string }) {
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSignals = async () => {
      try {
        const data = await fetchTradingSignals();
        if (data) {
          setSignals(data);
        }
      } catch (error) {
        console.error('Error loading signals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSignals();
  }, []);

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'buy':
        return 'text-green-500';
      case 'sell':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <IoTrendingUp className="w-5 h-5" />;
      case 'sell':
        return <IoTrendingDown className="w-5 h-5" />;
      default:
        return <IoSwapVertical className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-[#2A2C32] rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!signals || signals.length === 0) {
    return (
      <div className="bg-[#2A2C32] rounded-xl p-4 text-center text-gray-400">
        No trading signals available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {signals.map((signal) => (
        <div
          key={signal.id}
          className={`
            bg-[#2A2C32] rounded-xl p-4 hover:bg-[#313438] transition-colors
            ${signal.coin === selectedCoin ? 'ring-2 ring-purple-500' : ''}
          `}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-opacity-10 ${getSignalColor(signal.type)} bg-current`}>
                {getSignalIcon(signal.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{signal.coin}/USD</h3>
                  <span className="text-sm text-gray-400">{signal.timeframe}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Entry: ${signal.price.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">
                <span className="text-gray-400">Target: </span>
                <span className="text-green-500">${signal.target.toLocaleString()}</span>
              </div>
              <div className="text-sm mt-1">
                <span className="text-gray-400">Stop: </span>
                <span className="text-red-500">${signal.stopLoss.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
