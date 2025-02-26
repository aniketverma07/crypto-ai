"use client";

import { Line } from 'react-chartjs-2';

const miniChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { display: false },
    y: { display: false }
  },
  plugins: {
    legend: { display: false }
  },
  elements: {
    point: { radius: 0 },
    line: { tension: 0.4 }
  }
};

export default function InvestmentCrypto() {
  return (
    <div className="card mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Investment Crypto</h2>
        <div className="text-sm text-gray-400">Last Update: 30 minutes ago</div>
      </div>
      
      <div className="space-y-4">
        {[
          {
            name: 'Bitcoin',
            symbol: 'BTC',
            price: '$32635.00',
            change: '+4.65%',
            value: '$50243.40',
            color: '#F7931A',
            positive: true
          },
          {
            name: 'Ethereum',
            symbol: 'ETH',
            price: '$1843.00',
            change: '-2.73%',
            value: '$4940.20',
            color: '#627EEA',
            positive: false
          },
          {
            name: 'USDT',
            symbol: 'USDT',
            price: '$1.00',
            change: '-0.03%',
            value: '$2425.00',
            color: '#26A17B',
            positive: false
          }
        ].map((crypto, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-[#2A2C32] rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: crypto.color }}></div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{crypto.name}</span>
                  <span className="text-sm text-gray-400">{crypto.symbol}/USDT</span>
                </div>
                <div className="text-sm text-gray-400">Price: {crypto.price}</div>
              </div>
            </div>
            
            <div className="flex-1 max-w-[100px] h-[40px]">
              <Line
                data={{
                  labels: Array(12).fill(''),
                  datasets: [{
                    data: Array(12).fill(0).map(() => Math.random() * 100),
                    borderColor: crypto.positive ? '#22C55E' : '#EF4444',
                    borderWidth: 2,
                    fill: false
                  }]
                }}
                options={miniChartOptions}
              />
            </div>
            
            <div className="text-right">
              <div className="font-medium">{crypto.value}</div>
              <div className={crypto.positive ? 'positive-change' : 'negative-change'}>
                {crypto.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
