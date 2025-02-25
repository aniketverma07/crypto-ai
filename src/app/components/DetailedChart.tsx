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
    <div className="flex flex-wrap gap-2">
      {coins.map((coin) => (
        <button
          key={coin.symbol}
          onClick={() => onCoinChange(coin.symbol)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
    <div className="flex flex-wrap gap-2">
      {timeframes.map((timeframe) => (
        <button
          key={timeframe}
          onClick={() => onTimeframeChange(timeframe)}
          className={`min-w-[48px] px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
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
      <div className="animate-pulse space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-12 bg-[#2A2C32] rounded-lg" />
            ))}
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-12 bg-[#2A2C32] rounded-lg" />
            ))}
          </div>
        </div>
        <div className="h-[250px] sm:h-[400px] bg-[#2A2C32] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <CoinSelector selectedCoin={selectedCoin} onCoinChange={onCoinChange} />
        <TimeframeSelector 
          selectedTimeframe={selectedTimeframe} 
          onTimeframeChange={setSelectedTimeframe} 
        />
      </div>

      <div className="h-[250px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 5, left: 5, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#2A2C32" 
              vertical={false}
            />
            <XAxis
              dataKey="timestamp"
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={{ stroke: '#6B7280' }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return selectedTimeframe === '1H' ? date.toLocaleTimeString() :
                       selectedTimeframe === '1D' ? `${date.getHours()}:00` :
                       date.toLocaleDateString();
              }}
            />
            <YAxis
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={{ stroke: '#6B7280' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#2A2C32',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#6B7280', marginBottom: '4px' }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8B5CF6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
