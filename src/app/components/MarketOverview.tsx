"use client";

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';
import { fetchCryptoData, type CryptoData } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: '#2A2C32',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#3F3F46',
      borderWidth: 1,
    }
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 8,
      hoverRadius: 4,
    },
  },
};

export default function MarketOverview() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCryptoData();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatPercentage = (percent: number) => {
    return `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const generateChartData = (change: number) => {
    const dataPoints = Array(24).fill(0).map((_, i) => {
      const baseValue = 100;
      const trend = change > 0 ? 1 : -1;
      return baseValue + (Math.sin(i / 4) * 10 * trend) + (Math.random() * 5);
    });
    return dataPoints;
  };

  if (loading) {
    return (
      <div className="bg-[#1A1B1E] rounded-xl p-4 lg:p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-[#2A2C32] rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#2A2C32] h-[140px] rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const cryptoCards = cryptoData.slice(0, 3).map(crypto => ({
    name: crypto.name,
    symbol: crypto.symbol,
    price: formatPrice(crypto.quote.USD.price),
    change: formatPercentage(crypto.quote.USD.percent_change_24h),
    color: crypto.symbol === 'BTC' ? '#F7931A' : 
           crypto.symbol === 'ETH' ? '#627EEA' : '#14F195',
    trend: crypto.quote.USD.percent_change_24h > 0 ? 'up' : 'down'
  }));

  return (
    <div className="bg-[#1A1B1E] rounded-xl p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">Principal Resources</h2>
        <div className="text-sm text-gray-400 whitespace-nowrap">
          for the next 24 hours • {cryptoCards.length} Resources
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cryptoCards.map((crypto, index) => (
          <div 
            key={index} 
            className="bg-[#2A2C32] rounded-xl p-4 hover:bg-[#313438] transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: `${crypto.color}20` }}
              >
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: crypto.color }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{crypto.name}</span>
                  <span className={`text-sm font-medium ${
                    crypto.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {crypto.change}
                  </span>
                </div>
                <div className="text-sm text-gray-400">{crypto.symbol}</div>
              </div>
            </div>
            <div className="h-[60px] -mx-2">
              <Line
                data={{
                  labels: Array(24).fill(''),
                  datasets: [{
                    data: generateChartData(parseFloat(crypto.change)),
                    borderColor: crypto.trend === 'up' ? '#22C55E' : '#EF4444',
                    backgroundColor: crypto.trend === 'up' 
                      ? 'rgba(34, 197, 94, 0.1)' 
                      : 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                  }]
                }}
                options={chartOptions}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
