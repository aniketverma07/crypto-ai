"use client";

import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import { IoFlashOutline } from 'react-icons/io5';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-[#202226] border-b border-gray-800">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#6C5DD3] rounded-lg flex items-center justify-center">
            <IoFlashOutline className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Xoracle AI</h1>
            <span className="text-sm text-gray-300">AI-Powered Trading Platform</span>
          </div>
        </div>
        
        <div className="relative flex-1 max-w-xl ml-6">
          <input
            type="text"
            placeholder="Search anything"
            className="w-full bg-[#2A2C32] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-[#2A2C32] rounded-lg">
          <BellIcon className="h-6 w-6 text-gray-400" />
        </button>
        <button className="px-4 py-2 bg-[#2A2C32] rounded-lg hover:bg-[#313438] transition-colors">
          Connect Wallet
        </button>
        <div className="h-8 w-8 rounded-full bg-[#6C5DD3]"></div>
      </div>
    </header>
  );
}
