"use client";

import React, { useState, useEffect } from 'react';
import { IoCloseCircleOutline, IoDesktopOutline } from 'react-icons/io5';
import Header from './Header';
import MarketOverview from './MarketOverview';
import Portfolio from './Portfolio';
import Watchlist from './Watchlist';
import TradingInsights from './TradingInsights';
import NewsSection from './NewsSection';
import DesktopRecommendation from './DesktopRecommendation';
import AlertList from './AlertList';
import MarketAnalysis from './MarketAnalysis';

interface Coin {
  symbol: string;
  name: string;
}

export default function MobileLayout() {
  const [showWarning, setShowWarning] = useState(false);
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  useEffect(() => {
    // Show warning after 5 seconds
    const timer = setTimeout(() => {
      setShowWarning(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const dismissWarning = () => {
    setWarningDismissed(true);
  };

  return (
    <div className="md:hidden min-h-screen bg-[#13141B]">
      {/* Warning Message */}
      {showWarning && !warningDismissed && (
        <div className="fixed inset-x-0 top-0 z-50 animate-slide-down px-1">
        <div className="bg-[#1A1B1E] p-4 my-2 rounded-xl border border-[#6C5DD3] shadow-lg">
          <div className="flex items-start gap-3">
            <div className="bg-[#6C5DD3] p-2 rounded-lg shrink-0">
              <IoDesktopOutline className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">Switch to Desktop</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                For the best trading experience with full features and better visualization, please use our desktop version.
              </p>
            </div>
            <button 
              onClick={dismissWarning}
              className="text-gray-500 hover:text-white transition-colors shrink-0"
            >
              <IoCloseCircleOutline className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Mobile Content */}
      <div className="pb-20">
        <div className="space-y-4 pl-1 pr-6">
          {/* Header Section */}
          <Header />

          {/* Market Overview Section */}
          <div className="bg-[#1A1B1E] rounded-xl overflow-hidden">
            <MarketOverview />
          </div>

          {/* Portfolio Section */}
          <div className="bg-[#1A1B1E] rounded-xl overflow-hidden">
            <Portfolio />
          </div>

          {/* Watchlist Section */}
          <div className="bg-[#1A1B1E] rounded-xl overflow-x-auto">
            <Watchlist onCoinSelect={(coin) => setSelectedCoin(coin)} />
          </div>

          {/* Market Analysis Section */}
          <div className="bg-[#1A1B1E] rounded-xl overflow-hidden">
            <MarketAnalysis selectedCoin={selectedCoin} />
          </div>

          {/* Alert List Section */}
          <div className="bg-[#1A1B1E] rounded-xl overflow-hidden">
            <AlertList />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}