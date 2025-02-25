"use client";

import { useState } from 'react';

export default function AIAnalysis() {
  const analysis = {
    summary: {
      signal: 'Strong Buy',
      confidence: 92,
      prediction: '$54,850',
      timeframe: '24H'
    },
    indicators: [
      {
        name: 'Trend Analysis',
        status: 'Bullish',
        value: 8,
        details: 'All major EMAs showing strong upward trend'
      },
      {
        name: 'Price Action',
        status: 'Bullish',
        value: 7,
        details: 'Higher highs and higher lows pattern'
      },
      {
        name: 'Volume Profile',
        status: 'Neutral',
        value: 5,
        details: 'Average volume with slight buying pressure'
      },
      {
        name: 'Market Sentiment',
        status: 'Bullish',
        value: 8,
        details: 'Institutional buying detected'
      }
    ],
    keyLevels: {
      support: [
        { price: '$51,200', strength: 'Strong' },
        { price: '$50,400', strength: 'Major' }
      ],
      resistance: [
        { price: '$53,600', strength: 'Immediate' },
        { price: '$54,800', strength: 'Major' }
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'bullish':
        return 'text-[#22C55E]';
      case 'bearish':
        return 'text-[#EF4444]';
      default:
        return 'text-gray-400';
    }
  };

  const getValueColor = (value: number) => {
    if (value >= 7) return 'text-[#22C55E]';
    if (value >= 4) return 'text-[#F59E0B]';
    return 'text-[#EF4444]';
  };

  return (
    <div className="bg-[#1A1B1E] rounded-xl p-6 mt-4">
      {/* Header with Summary */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">AI Analysis</h2>
          <div className="text-sm text-gray-400">Next {analysis.summary.timeframe} Prediction</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#22C55E]">{analysis.summary.signal}</div>
          <div className="text-sm text-gray-400">{analysis.summary.confidence}% Confidence</div>
        </div>
      </div>

      {/* Price Prediction */}
      <div className="bg-[#2A2C32] rounded-xl p-4 mb-6">
        <div className="text-sm text-gray-400 mb-1">Price Target</div>
        <div className="text-2xl font-bold text-[#6C5DD3]">{analysis.summary.prediction}</div>
      </div>

      {/* Technical Indicators */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Technical Indicators</h3>
        <div className="space-y-3">
          {analysis.indicators.map((indicator, index) => (
            <div key={index} className="bg-[#2A2C32] rounded-xl p-3 hover:bg-[#313438] transition-colors">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{indicator.name}</span>
                <span className={getStatusColor(indicator.status)}>{indicator.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#1A1B1E] rounded-full">
                  <div
                    className="h-1.5 rounded-full bg-[#6C5DD3]"
                    style={{ width: `${(indicator.value / 10) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-sm ${getValueColor(indicator.value)}`}>{indicator.value}/10</span>
              </div>
              <div className="text-sm text-gray-400 mt-1">{indicator.details}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Levels */}
      <div>
        <h3 className="text-sm font-medium mb-3">Key Levels</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#2A2C32] rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-2">Support</div>
            {analysis.keyLevels.support.map((level, index) => (
              <div key={index} className="flex items-center justify-between mb-1">
                <span className="text-[#22C55E]">{level.price}</span>
                <span className="text-sm text-gray-400">{level.strength}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#2A2C32] rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-2">Resistance</div>
            {analysis.keyLevels.resistance.map((level, index) => (
              <div key={index} className="flex items-center justify-between mb-1">
                <span className="text-[#EF4444]">{level.price}</span>
                <span className="text-sm text-gray-400">{level.strength}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
