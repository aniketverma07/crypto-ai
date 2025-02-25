"use client";

import { useState } from 'react';
import { IoSendOutline, IoRefreshOutline, IoBulbOutline, IoSparklesOutline, IoLockClosedOutline, IoCloseCircleOutline, IoDesktopOutline } from 'react-icons/io5';

export default function AskAI() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBetaWarning, setShowBetaWarning] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowBetaWarning(true);
  };

  const clearChat = () => {
    setQuery('');
    setResponse('');
  };

  const suggestionQuestions = [
    "What's the market sentiment for BTC?",
    "Should I invest in ETH now?",
    "Best trading strategy for beginners?",
    "How to manage risk in crypto trading?"
  ];

  return (
    <div className="bg-gradient-to-br from-[#1A1B1E] to-[#1F2937] rounded-xl p-6 mb-4 shadow-xl border border-gray-800 relative">
      {/* Beta Warning Popup */}
      {showBetaWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-[#1A1B1E] rounded-xl p-6 max-w-md w-full border border-[#6C5DD3] shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#6C5DD3] p-2 rounded-lg">
                <IoDesktopOutline className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Beta Version Notice</h3>
            </div>
            <p className="text-gray-300 mb-6">
              AI Assistant is currently in beta and only available in desktop mode. Please switch to desktop for the full experience.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowBetaWarning(false)}
                className="bg-[#6C5DD3] text-white px-6 py-2 rounded-lg hover:bg-[#5B4CB3] transition-colors flex items-center gap-2"
              >
                <IoCloseCircleOutline className="w-5 h-5" />
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#6C5DD3] p-2 rounded-lg">
            <IoSparklesOutline className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-[#6C5DD3] to-[#8B5CF6] text-transparent bg-clip-text">
              AI Trading Assistant
            </h2>
            <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <IoLockClosedOutline className="w-3 h-3" />
              Beta Version
            </span>
          </div>
        </div>
        {response && (
          <button
            onClick={clearChat}
            className="text-gray-400 hover:text-[#6C5DD3] transition-colors p-2 hover:bg-[#2A2C32] rounded-lg"
          >
            <IoRefreshOutline className="w-5 h-5" />
          </button>
        )}
      </div>

      {response ? (
        <div className="mb-6 bg-[#2A2C32]/50 rounded-xl p-4">
          <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
            <IoBulbOutline className="w-4 h-4" />
            Your question:
          </div>
          <div className="text-white mb-4 pl-6">{query}</div>
          <div className="text-sm text-[#6C5DD3] mb-2 flex items-center gap-2">
            <IoSparklesOutline className="w-4 h-4" />
            AI response:
          </div>
          <div className="text-white pl-6 leading-relaxed flex items-center gap-2">
            <IoLockClosedOutline className="w-4 h-4 text-[#6C5DD3]" />
            {response}
          </div>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-400 mb-6 bg-[#2A2C32]/50 p-4 rounded-xl">
            Ask me anything about market analysis, trading strategies, or risk management
          </div>
          <div className="mb-6">
            <div className="text-sm text-[#6C5DD3] mb-3 flex items-center gap-2">
              <IoBulbOutline className="w-4 h-4" />
              Suggested Questions:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestionQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(question)}
                  className="text-left text-sm text-gray-300 hover:text-white p-2 rounded-lg hover:bg-[#2A2C32]/70 transition-all duration-200 truncate"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question..."
          className="w-full bg-[#2A2C32] text-white rounded-xl py-3.5 px-4 pr-12 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] transition-all duration-200 hover:bg-[#2A2C32]/80"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6C5DD3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-1.5 hover:bg-[#1A1B1E] rounded-lg"
        >
          <IoSendOutline className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
