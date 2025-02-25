"use client";

import { useSidebar } from "../context/SidebarContext";
import {
  HomeIcon,
  ChartBarIcon,
  WalletIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <div
          className={`fixed top-[88px] left-0 h-[calc(100vh-88px)] bg-[#1A1B1E] transform transition-all duration-300 ease-in-out ${
            isOpen ? "w-64" : "w-16"
          } z-40`}
        >
          <div className="flex flex-col h-full">
            <nav className="flex-1 px-2 py-4 space-y-2">
              <Link
                href="/"
                className="flex items-center px-3 py-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-lg transition-colors"
                title="Dashboard"
              >
                <HomeIcon className="w-6 h-6" />
                <span className={`ml-3 whitespace-nowrap ${isOpen ? 'block' : 'hidden'}`}>
                  Dashboard
                </span>
              </Link>

              <Link
                href="/market"
                className="flex items-center px-3 py-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-lg transition-colors"
                title="Market"
              >
                <ChartBarIcon className="w-6 h-6" />
                <span className={`ml-3 whitespace-nowrap ${isOpen ? 'block' : 'hidden'}`}>
                  Market
                </span>
              </Link>

              <Link
                href="/trading"
                className="flex items-center px-3 py-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-lg transition-colors"
                title="Trading"
              >
                <ArrowTrendingUpIcon className="w-6 h-6" />
                <span className={`ml-3 whitespace-nowrap ${isOpen ? 'block' : 'hidden'}`}>
                  Trading
                </span>
              </Link>

              <Link
                href="/portfolio"
                className="flex items-center px-3 py-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-lg transition-colors"
                title="Portfolio"
              >
                <WalletIcon className="w-6 h-6" />
                <span className={`ml-3 whitespace-nowrap ${isOpen ? 'block' : 'hidden'}`}>
                  Portfolio
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-[#1A1B1E] transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-[88px]">
          <nav className="flex-1 px-2 py-4 space-y-2">
            <Link
              href="/"
              className="flex items-center px-3 py-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-lg transition-colors"
              onClick={toggle}
            >
              <HomeIcon className="w-6 h-6" />
              <span className="ml-3">Dashboard</span>
            </Link>

            <Link
              href="/market"
              className="flex items-center px-3 py-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-lg transition-colors"
              onClick={toggle}
            >
              <ChartBarIcon className="w-6 h-6" />
              <span className="ml-3">Market</span>
            </Link>

            <Link
              href="/trading"
              className="flex items-center px-3 py-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-lg transition-colors"
              onClick={toggle}
            >
              <ArrowTrendingUpIcon className="w-6 h-6" />
              <span className="ml-3">Trading</span>
            </Link>

            <Link
              href="/portfolio"
              className="flex items-center px-3 py-3 text-gray-400 hover:text-white hover:bg-[#2A2C32] rounded-lg transition-colors"
              onClick={toggle}
            >
              <WalletIcon className="w-6 h-6" />
              <span className="ml-3">Portfolio</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggle}
        />
      )}
    </>
  );
}
