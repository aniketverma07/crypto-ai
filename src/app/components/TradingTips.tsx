"use client";

import { useEffect, useState } from 'react';
import { fetchTradingTips } from '../services/api';
import { IoFlashOutline, IoWarningOutline, IoBookOutline, IoPulseOutline } from 'react-icons/io5';

interface TradingTip {
  category: string;
  tip: string;
}

export default function TradingTips() {
  const [tips, setTips] = useState<TradingTip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTips = async () => {
      try {
        const data = await fetchTradingTips();
        setTips(data);
      } catch (error) {
        console.error('Error loading trading tips:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTips();
  }, []);

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'strategy':
        return <IoFlashOutline className="w-5 h-5 text-[#3B82F6]" />;
      case 'risk':
        return <IoWarningOutline className="w-5 h-5 text-[#EF4444]" />;
      case 'technical':
        return <IoBookOutline className="w-5 h-5 text-[#22C55E]" />;
      case 'psychology':
        return <IoPulseOutline className="w-5 h-5 text-[#8B5CF6]" />;
      default:
        return <IoFlashOutline className="w-5 h-5 text-[#6C5DD3]" />;
    }
  };

  const getColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'strategy':
        return 'text-[#3B82F6]';
      case 'risk':
        return 'text-[#EF4444]';
      case 'technical':
        return 'text-[#22C55E]';
      case 'psychology':
        return 'text-[#8B5CF6]';
      default:
        return 'text-[#6C5DD3]';
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1A1B1E] rounded-xl p-4 h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1B1E] rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Trading Tips</h2>
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="p-4 bg-[#2A2C32] rounded-xl hover:bg-[#313438] transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#1A1B1E] rounded-lg flex items-center justify-center">
                {getIcon(tip.category)}
              </div>
              <div>
                <div className={`font-medium mb-1 ${getColor(tip.category)}`}>
                  {tip.category.toUpperCase()}
                </div>
                <div className="text-sm text-gray-400">
                  {tip.tip}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
