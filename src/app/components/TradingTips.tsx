"use client";

import { useState, useEffect } from 'react';
import { IoTrendingUp, IoTrendingDown, IoWarning, IoInformationCircle } from 'react-icons/io5';
import { fetchTradingTips } from '../services/api';

interface TradingTip {
  id: number;
  type: string;
  title: string;
  description: string;
  color: string;
}

export default function TradingTips() {
  const [tips, setTips] = useState<TradingTip[]>([]);
  const [activeTip, setActiveTip] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTips = async () => {
      try {
        const data = await fetchTradingTips();
        if (data) {
          setTips(data);
        }
      } catch (error) {
        console.error('Error loading tips:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTips();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'signal':
        return IoTrendingUp;
      case 'warning':
        return IoWarning;
      case 'info':
        return IoInformationCircle;
      default:
        return IoTrendingDown;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-[#2A2C32] rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!tips || tips.length === 0) {
    return (
      <div className="bg-[#2A2C32] rounded-xl p-4 text-center text-gray-400">
        No trading tips available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tips.map((tip, index) => {
        const Icon = getIcon(tip.type);
        return (
          <div
            key={tip.id}
            className={`
              bg-[#2A2C32] rounded-xl p-4 transition-all duration-300 hover:bg-[#313438]
              ${index === activeTip ? 'scale-100 opacity-100' : 'scale-95 opacity-70'}
              hover:scale-100 hover:opacity-100 cursor-pointer
            `}
            onClick={() => setActiveTip(index)}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-opacity-10 ${tip.color} bg-current`}>
                <Icon className={`w-5 h-5 ${tip.color}`} />
              </div>
              <div>
                <h3 className="font-medium mb-1">{tip.title}</h3>
                <p className="text-sm text-gray-400">{tip.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
