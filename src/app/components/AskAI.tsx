"use client";

import { useState } from 'react';
import { IoSendOutline, IoRefreshOutline } from 'react-icons/io5';

export default function AskAI() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    // Mock AI response
    setTimeout(() => {
      const mockResponses = [
        "Based on the current market conditions, BTC shows strong support at $48,000. Consider setting stop losses below this level.",
        "ETH's recent price action suggests accumulation. The RSI indicates oversold conditions, presenting a potential entry point.",
        "Market sentiment is currently neutral with a bullish bias. Watch for volume confirmation before making major moves.",
        "Technical indicators suggest a potential breakout within 24-48 hours. Key resistance levels at $52,000.",
      ];
      setResponse(mockResponses[Math.floor(Math.random() * mockResponses.length)]);
      setIsLoading(false);
    }, 1000);
  };

  const clearChat = () => {
    setQuery('');
    setResponse('');
  };

  return (
    <div className="bg-[#1A1B1E] rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Ask AI Assistant</h2>
        {response && (
          <button
            onClick={clearChat}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <IoRefreshOutline className="w-5 h-5" />
          </button>
        )}
      </div>

      {response ? (
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">Your question:</div>
          <div className="text-white mb-4">{query}</div>
          <div className="text-sm text-gray-400 mb-2">AI response:</div>
          <div className="text-white">{response}</div>
        </div>
      ) : (
        <div className="text-sm text-gray-400 mb-4">
          Ask me anything about market analysis, trading strategies, or risk management
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question..."
          className="w-full bg-[#2A2C32] text-white rounded-xl py-3 px-4 pr-12 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
          ) : (
            <IoSendOutline className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
}
