"use client";

import { useSidebar } from "../context/SidebarContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BetaBanner from "./BetaBanner";
import MobileWarning from "./MobileWarning";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();
  
  return (
    <div className="flex flex-col min-h-screen bg-[#13141B] text-white">
      <MobileWarning />
      <BetaBanner />
      <div className="flex flex-1">
        <Sidebar />
        <div className={`flex-1 transition-all duration-300 ${isExpanded ? 'ml-16' : 'ml-0'}`}>
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
