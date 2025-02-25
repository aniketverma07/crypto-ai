"use client";

import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import { IoFlashOutline } from 'react-icons/io5';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useSidebar } from '../context/SidebarContext';

export default function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-[#202226] border-b border-gray-800">
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={toggle}
          className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-lg transition-colors"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#6C5DD3] rounded-lg flex items-center justify-center">
            <IoFlashOutline className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg">Xoracle AI</h1>
            <span className="text-sm text-gray-300">AI-Powered Trading</span>
          </div>
        </div>
        
        <div className="relative flex-1 max-w-xl ml-6 hidden md:block">
          <input
            type="text"
            placeholder="Search anything"
            className="w-full bg-[#2A2C32] text-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
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
