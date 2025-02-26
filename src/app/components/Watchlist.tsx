"use client";

import { useState, useEffect } from 'react';
import { IoSearchOutline, IoAddOutline, IoCloseOutline, IoTrendingUpOutline, IoTrendingDownOutline } from 'react-icons/io5';
import { useCrypto } from '../context/CryptoContext';

interface Coin {
  symbol: string;
  name: string;
  price?: number;
  change24h?: number;
}

interface CoinData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

interface WatchlistProps {
  onCoinSelect: (coin: Coin) => void;
}

export default function Watchlist({ onCoinSelect }: WatchlistProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [coins, setCoins] = useState<CoinData[]>([
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 52345.20,
      change24h: 2.34
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3744.56,
      change24h: -1.23
    },
    {
      symbol: 'BNB',
      name: 'BNB',
      price: 312.45,
      change24h: 0.89
    }
  ]);

  const [searchResults, setSearchResults] = useState<CoinData[]>([
    { symbol: 'ADA', name: 'Cardano', price: 1.23, change24h: 3.45 },
    { symbol: 'SOL', name: 'Solana', price: 123.45, change24h: 5.67 },
    { symbol: 'XRP', name: 'Ripple', price: 0.89, change24h: -2.34 },
    { symbol: 'DOT', name: 'Polkadot', price: 21.34, change24h: 1.23 }
  ]);

  const toggleCoin = (coin: CoinData) => {
    if (searchResults.some(w => w.symbol === coin.symbol)) {
      setSearchResults(searchResults.filter(w => w.symbol !== coin.symbol));
    } else {
      setSearchResults([...searchResults, coin]);
    }
  };

  const selectCoin = (coin: CoinData) => {
    onCoinSelect({
      name: coin.name,
      symbol: coin.symbol,
      price: coin.price,
      change24h: coin.change24h
    });
  };

  const filteredResults = searchResults.filter(coin =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update prices periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => 
        prevCoins.map(coin => ({
          ...coin,
          price: coin.price * (1 + (Math.random() - 0.5) * 0.002), // 0.1% variation
          change24h: coin.change24h + (Math.random() - 0.5) * 0.2 // Small random change
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1A1B1E] rounded-xl p-4 md:p-6 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-semibold">Watchlist</h2>
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 hover:bg-[#2A2C32] rounded-lg transition-colors"
          aria-label="Add to watchlist"
        >
          <IoAddOutline className="w-5 h-5" />
        </button>
      </div>

      {/* Watchlist - Horizontal scroll on mobile */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:block md:overflow-visible md:px-0 md:mx-0 space-x-3 md:space-x-0 md:space-y-3">
        {coins.map((coin) => (
          <button
            key={coin.symbol}
            onClick={() => onCoinSelect({ name: coin.name, symbol: coin.symbol })}
            className="flex-shrink-0 w-[280px] md:w-full p-3 bg-[#2A2C32] rounded-xl hover:bg-[#313438] transition-colors active:bg-[#363840]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1A1B1E] rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium">{coin.symbol}</span>
                </div>
                <div>
                  <div className="font-medium">{coin.name}</div>
                  <div className="text-sm text-gray-400">{coin.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div className={`flex items-center gap-1 ${coin.change24h >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                  {coin.change24h >= 0 ? (
                    <IoTrendingUpOutline className="w-4 h-4" />
                  ) : (
                    <IoTrendingDownOutline className="w-4 h-4" />
                  )}
                  <span>{Math.abs(coin.change24h).toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Search Modal - Full screen on mobile */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center z-50">
          <div className="bg-[#1A1B1E] w-full h-full md:h-auto md:w-[480px] md:max-h-[80vh] md:rounded-xl overflow-hidden">
            <div className="sticky top-0 bg-[#1A1B1E] p-4 md:p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add Coins</h3>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 hover:bg-[#2A2C32] rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <IoCloseOutline className="w-6 h-6" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search coins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#2A2C32] rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]"
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="overflow-y-auto h-[calc(100vh-140px)] md:max-h-[400px] p-4 md:p-6 space-y-2">
              {filteredResults.map((coin) => (
                <div
                  key={coin.symbol}
                  className="flex items-center justify-between p-3 hover:bg-[#2A2C32] rounded-xl transition-colors cursor-pointer active:bg-[#313438]"
                  onClick={() => toggleCoin(coin)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2A2C32] rounded-lg flex items-center justify-center">
                      {coin.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-sm text-gray-400">{coin.symbol}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div>${coin.price.toLocaleString()}</div>
                      <div className={coin.change24h >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}>
                        {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${searchResults.some(w => w.symbol === coin.symbol) ? 'bg-[#6C5DD3] border-[#6C5DD3]' : 'border-gray-400'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
