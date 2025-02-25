"use client";

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchCryptoHistoricalData } from '../services/api';

interface CoinSelectorProps {
  selectedCoin: string;
  onCoinChange: (coin: string) => void;
}

const CoinSelector: React.FC<CoinSelectorProps> = ({ selectedCoin, onCoinChange }) => {
  const coins = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'XRP', name: 'Ripple' },
  ];

  return (
    <div className="flex items-center gap-2 mb-4">
      {coins.map((coin) => (
        <button
          key={coin.symbol}
          onClick={() => onCoinChange(coin.symbol)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCoin === coin.symbol
              ? 'bg-purple-500 text-white'
              : 'bg-[#2A2C32] text-gray-400 hover:bg-[#313438]'
          }`}
        >
          {coin.symbol}
        </button>
      ))}
    </div>
  );
};

interface TimeframeProps {
  selectedTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const TimeframeSelector: React.FC<TimeframeProps> = ({ selectedTimeframe, onTimeframeChange }) => {
  const timeframes = ['1H', '4H', '1D', '1W', '1M'];

  return (
    <div className="flex items-center gap-2">
      {timeframes.map((timeframe) => (
        <button
          key={timeframe}
          onClick={() => onTimeframeChange(timeframe)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            selectedTimeframe === timeframe
              ? 'bg-purple-500 text-white'
              : 'bg-[#2A2C32] text-gray-400 hover:bg-[#313438]'
          }`}
        >
          {timeframe}
        </button>
      ))}
    </div>
  );
};

interface ChartData {
  timestamp: string;
  price: number;
}

interface DetailedChartProps {
  selectedCoin: string;
  onCoinChange: (coin: string) => void;
}

export default function DetailedChart({ selectedCoin, onCoinChange }: DetailedChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChartData = async () => {
      setLoading(true);
      try {
        const data = await fetchCryptoHistoricalData(selectedCoin, selectedTimeframe);
        setChartData(data.data.map((item: { timestamp: number; price: number }) => ({
          timestamp: new Date(item.timestamp).toLocaleString(),
          price: item.price
        })));
      } catch (error) {
        console.error('Error loading chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, [selectedCoin, selectedTimeframe]);

  if (loading) {
    return (
      <div className="bg-[#1A1B1E] rounded-xl p-6 h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1B1E] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <CoinSelector selectedCoin={selectedCoin} onCoinChange={onCoinChange} />
        <TimeframeSelector selectedTimeframe={selectedTimeframe} onTimeframeChange={setSelectedTimeframe} />
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2C32" />
            <XAxis
              dataKey="timestamp"
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
              tickLine={{ stroke: '#6B7280' }}
            />
            <YAxis
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
              tickLine={{ stroke: '#6B7280' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#2A2C32',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#6B7280' }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8B5CF6"
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
