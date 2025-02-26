"use client";

import { useState } from 'react';
import DetailedChart from './components/DetailedChart';
import MarketOverview from './components/MarketOverview';
import MarketAnalysis from './components/MarketAnalysis';
import Watchlist from './components/Watchlist';
import Portfolio from './components/Portfolio';
import TradingTips from './components/TradingTips';
import Header from './components/Header';
import NewsSection from './components/NewsSection';
import TradingInsights from './components/TradingInsights';
import AskAI from './components/AskAI';
import ErrorBoundary from './components/ErrorBoundary';
import { IoMenu, IoClose } from 'react-icons/io5';
import MobileWarning from './components/MobileWarning';
import AIAnalysis from './components/AIAnalysis';
import AlertList from './components/AlertList';

interface Coin {
  symbol: string;
  name: string;
  price?: number;
  change24h?: number;
}

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCoinSelect = (coin: Coin) => {
    setSelectedCoin(coin);
  };

  return (
    <div className="min-h-screen bg-[#13141B] relative">
      <MobileWarning />

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#1A1B1E] z-20 px-4 py-3 border-b border-[#2A2C32]">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">CryptoDash</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isSidebarOpen ? (
              <IoClose className="w-6 h-6" />
            ) : (
              <IoMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Main Content */}
        <main className="flex-1 lg:flex-[3] pt-16 lg:pt-0 pb-4 pl-1 pr-4 sm:pl-2 sm:pr-6 lg:p-6 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto space-y-4 lg:space-y-6">
            <ErrorBoundary>
              <MarketOverview />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <div className="bg-[#1A1B1E] rounded-xl p-4 lg:p-6">
                <DetailedChart selectedCoin={selectedCoin} onCoinChange={handleCoinSelect} />
              </div>
            </ErrorBoundary>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-4 lg:space-y-6">
                <ErrorBoundary>
                  <AIAnalysis />
                </ErrorBoundary>
                <ErrorBoundary>
                  <AlertList />
                </ErrorBoundary>
              </div>
              <div className="space-y-4 lg:space-y-6">
                <ErrorBoundary>
                  <NewsSection />
                </ErrorBoundary>
                <ErrorBoundary>
                  <AskAI />
                </ErrorBoundary>
                <ErrorBoundary>
                  <TradingInsights />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:relative top-0 right-0 h-full w-[85%] sm:w-[400px] lg:w-[350px] 
            bg-[#1A1B1E] overflow-y-auto transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            lg:transform-none lg:border-l border-[#2A2C32] z-30
            pt-16 lg:pt-0
          `}
        >
          <div className="pl-1 pr-4 sm:pl-2 sm:pr-6 py-4 lg:p-6 space-y-4 lg:space-y-6">
            <ErrorBoundary>
              <Watchlist onCoinSelect={handleCoinSelect} />
            </ErrorBoundary>
            <ErrorBoundary>
              <MarketAnalysis selectedCoin={selectedCoin} />
            </ErrorBoundary>
            <ErrorBoundary>
              <Portfolio />
            </ErrorBoundary>
            <ErrorBoundary>
              {/* Trading Tips Section */}
              <div className="bg-[#1A1B1E] rounded-xl p-4 lg:p-6">
                <h2 className="text-xl font-semibold mb-4">Trading Tips</h2>
                <TradingTips />
              </div>
            </ErrorBoundary>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
