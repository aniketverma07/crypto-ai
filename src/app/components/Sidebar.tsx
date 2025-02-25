"use client";

import {
  HomeIcon,
  ChartBarIcon,
  WalletIcon,
  Cog6ToothIcon,
  ArrowTrendingUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "../context/SidebarContext";

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`fixed left-0 bg-[#202226] border-r border-[#2A2C32] flex flex-col items-center py-6 h-[calc(100vh-32px)] overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? "w-16" : "w-0"
      }`}
    >
      <nav className="flex-1 flex flex-col items-center gap-4">
        <button className="p-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-xl transition-colors">
          <HomeIcon className="w-6 h-6" />
        </button>
        <button className="p-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-xl transition-colors">
          <ChartBarIcon className="w-6 h-6" />
        </button>
        <button className="p-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-xl transition-colors">
          <ArrowTrendingUpIcon className="w-6 h-6" />
        </button>
        <button className="p-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-xl transition-colors">
          <WalletIcon className="w-6 h-6" />
        </button>
      </nav>

      <div className="flex flex-col gap-4">
        <button className="p-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-xl transition-colors">
          <Cog6ToothIcon className="w-6 h-6" />
        </button>
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-[#202226] border border-[#2A2C32] rounded-full p-1 text-gray-400 hover:text-white transition-colors"
      >
        {isExpanded ? (
          <ChevronLeftIcon className="w-4 h-4" />
        ) : (
          <ChevronRightIcon className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
}
