"use client";

export default function AlertList() {
  const alerts = [
    {
      type: 'price',
      title: 'BTC Price Alert',
      description: 'Bitcoin just crossed above $52,000',
      time: '2 minutes ago',
      priority: 'high'
    },
    {
      type: 'volume',
      title: 'Volume Alert',
      description: 'Unusual volume detected on ETH/USD',
      time: '5 minutes ago',
      priority: 'medium'
    },
    {
      type: 'news',
      title: 'Breaking News',
      description: 'Major protocol upgrade announced',
      time: '12 minutes ago',
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[#EF4444]';
      case 'medium':
        return 'bg-[#F59E0B]';
      case 'low':
        return 'bg-[#22C55E]';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-[#1A1B1E] rounded-xl p-6 mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Alerts</h2>
        <button className="text-sm text-[#6C5DD3] hover:text-[#8677E3] transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="p-4 bg-[#2A2C32] rounded-xl hover:bg-[#313438] transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(alert.priority)}`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{alert.title}</h3>
                  <span className="text-sm text-gray-400">{alert.time}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
