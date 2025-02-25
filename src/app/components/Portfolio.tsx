"use client";

import { useState } from 'react';
import { IoWalletOutline, IoTrendingUpOutline, IoTrendingDownOutline, IoEllipsisHorizontalOutline } from 'react-icons/io5';

interface PortfolioAsset {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  price: number;
  value: number;
  change24h: number;
  color: string;
}

export default function Portfolio() {
  const [assets] = useState<PortfolioAsset[]>([
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.45,
      price: 52345.20,
      value: 23555.34,
      change24h: 2.34,
      color: '#F7931A'
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 4.2,
      price: 2845.67,
      value: 11951.81,
      change24h: -1.23,
      color: '#627EEA'
    },
    {
      id: 3,
      name: 'Cardano',
      symbol: 'ADA',
      amount: 3500,
      price: 0.58,
      value: 2030.00,
      change24h: 5.67,
      color: '#0033AD'
    }
  ]);

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = assets.reduce((sum, asset) => sum + (asset.value * asset.change24h / 100), 0);
  const changePercentage = (totalChange / totalValue) * 100;

  return (
    <div className="bg-[#1A1B1E] rounded-xl p-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Portfolio</h2>
        <button className="p-2 hover:bg-[#2A2C32] rounded-lg transition-colors">
          <IoEllipsisHorizontalOutline className="w-5 h-5" />
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="p-4 bg-[#2A2C32] rounded-xl mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1A1B1E] rounded-xl flex items-center justify-center">
            <IoWalletOutline className="w-6 h-6 text-[#6C5DD3]" />
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Balance</div>
            <div className="text-xl font-semibold">
              ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="ml-auto">
            <div className={`flex items-center ${changePercentage >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
              {changePercentage >= 0 ? (
                <IoTrendingUpOutline className="w-5 h-5 mr-1" />
              ) : (
                <IoTrendingDownOutline className="w-5 h-5 mr-1" />
              )}
              {changePercentage >= 0 ? '+' : ''}{changePercentage.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-400">24h Change</div>
          </div>
        </div>
      </div>

      {/* Assets List */}
      <div className="space-y-2">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="p-3 bg-[#2A2C32] rounded-xl hover:bg-[#313438] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: asset.color + '1A', color: asset.color }}
              >
                {asset.symbol.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-right font-medium">
                    ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div>{asset.amount} {asset.symbol}</div>
                  <div className={asset.change24h >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
