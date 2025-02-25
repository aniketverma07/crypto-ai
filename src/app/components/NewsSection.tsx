"use client";

import { useState } from 'react';
import { IoNewspaperOutline, IoTimeOutline, IoArrowForward } from 'react-icons/io5';

export default function NewsSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'bitcoin' | 'defi'>('all');

  const newsItems = [
    {
      id: 1,
      category: 'bitcoin',
      title: 'Bitcoin Hits New All-Time High Above $52,000',
      source: 'CoinDesk',
      time: '10m ago',
      impact: 'high',
    },
    {
      id: 2,
      category: 'defi',
      title: 'Major DeFi Protocol Announces V2 Launch',
      source: 'Decrypt',
      time: '25m ago',
      impact: 'medium',
    },
    {
      id: 3,
      category: 'bitcoin',
      title: 'Institutional Investors Increase Bitcoin Holdings',
      source: 'Bloomberg',
      time: '1h ago',
      impact: 'high',
    }
  ];

  const filteredNews = activeCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-[#EF4444]';
      case 'medium':
        return 'bg-[#F59E0B]';
      default:
        return 'bg-[#22C55E]';
    }
  };

  return (
    <div className="bg-[#1A1B1E] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Market News</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-2 py-1 text-xs rounded-lg transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#6C5DD3] text-white'
                : 'text-gray-400 hover:bg-[#2A2C32]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory('bitcoin')}
            className={`px-2 py-1 text-xs rounded-lg transition-colors ${
              activeCategory === 'bitcoin'
                ? 'bg-[#6C5DD3] text-white'
                : 'text-gray-400 hover:bg-[#2A2C32]'
            }`}
          >
            BTC
          </button>
          <button
            onClick={() => setActiveCategory('defi')}
            className={`px-2 py-1 text-xs rounded-lg transition-colors ${
              activeCategory === 'defi'
                ? 'bg-[#6C5DD3] text-white'
                : 'text-gray-400 hover:bg-[#2A2C32]'
            }`}
          >
            DeFi
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            className="p-3 bg-[#2A2C32] rounded-xl hover:bg-[#313438] transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#1A1B1E] rounded-lg flex items-center justify-center">
                <IoNewspaperOutline className="w-4 h-4 text-[#6C5DD3]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400">{news.source}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${getImpactColor(news.impact)}`} />
                  <div className="flex items-center text-xs text-gray-400">
                    <IoTimeOutline className="w-3 h-3 mr-0.5" />
                    {news.time}
                  </div>
                </div>
                <h3 className="font-medium text-sm truncate">{news.title}</h3>
              </div>
              <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                <IoArrowForward className="w-4 h-4 text-[#6C5DD3]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
