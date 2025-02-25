"use client";

import { IoDesktopOutline } from 'react-icons/io5';

export default function DesktopRecommendation() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500 to-yellow-600 py-3 px-4">
      <div className="container mx-auto flex items-center justify-center text-center">
        <IoDesktopOutline className="w-5 h-5 mr-2 flex-shrink-0" />
        <span className="text-sm font-medium text-white">
          For the best experience, please use desktop version
        </span>
      </div>
    </div>
  );
}
