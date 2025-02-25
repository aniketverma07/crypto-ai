"use client";

import { useState } from 'react';
import { IoWarningOutline, IoCloseOutline } from 'react-icons/io5';

export default function BetaBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#6C5DD3] to-[#8B5CF6] text-white py-2 relative">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <IoWarningOutline className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">
          Beta Version - Launching Soon! Join our waitlist for early access.
        </span>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 text-white/80 hover:text-white transition-colors"
        >
          <IoCloseOutline className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
