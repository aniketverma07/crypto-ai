"use client";

import { useSidebar } from "../context/SidebarContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { IoWarningOutline } from 'react-icons/io5';
import dynamic from 'next/dynamic';

const DynamicDesktopRecommendation = dynamic(
  () => import('./DesktopRecommendation'),
  { ssr: false }
);

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  
  return (
    <div className="min-h-screen bg-[#13141B] text-white">
      <Header />
      <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-[#6C5DD3] to-[#8B5CF6] py-2">
        <div className="container mx-auto px-4 flex items-center justify-center text-center">
          <IoWarningOutline className="w-5 h-5 mr-2 flex-shrink-0" />
          <span className="text-sm font-medium">
            Beta Version - Launching Soon!
          </span>
        </div>
      </div>
      <div className="pt-24">
        <div className="flex">
          <Sidebar />
          <main className={`flex-1 transition-all duration-300 ${isOpen ? 'md:ml-64' : 'md:ml-16'} px-4 md:px-6`}>
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
      <DynamicDesktopRecommendation />
    </div>
  );
}
