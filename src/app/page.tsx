"use client";

import { useState } from 'react';
import DetailedChart from './components/DetailedChart';
import MarketOverview from './components/MarketOverview';
import MarketAnalysis from './components/MarketAnalysis';
import AIAnalysis from './components/AIAnalysis';
import AlertList from './components/AlertList';
import NewsSection from './components/NewsSection';
import TradingSignals from './components/TradingSignals';
import Watchlist from './components/Watchlist';
import TradingTips from './components/TradingTips';
import Portfolio from './components/Portfolio';
import TradingInsights from './components/TradingInsights';
import AskAI from './components/AskAI';

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState('BTC');

  const handleCoinSelect = (coin: string) => {
    setSelectedCoin(coin);
  };

  return (
    <main className="flex min-h-screen">
      {/* Main content area */}
      <div className="flex-1 p-6">
        <MarketOverview />
        <DetailedChart selectedCoin={selectedCoin} onCoinChange={handleCoinSelect} />
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col h-full">
            <AIAnalysis />
            <div className="flex-1" />
            <TradingTips />
          </div>
          <div className="flex flex-col h-full">
            <AlertList />
            <NewsSection />
            <div className="flex-1" />
            <TradingInsights />
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-[400px] p-6 border-l border-[#2A2C32] flex flex-col">
        <div>
          <Watchlist onCoinSelect={handleCoinSelect} />
          <Portfolio />
          <MarketAnalysis />
        </div>
        <AskAI />
        <TradingSignals selectedCoin={selectedCoin} />
      </div>
    </main>
  );
}
