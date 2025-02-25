"use client";

import { useEffect, useState } from 'react';

export default function MobileWarning() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Changed to 1024px for better tablet support
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!mounted || !isMobile) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-[#202226] rounded-xl p-8 max-w-md w-full text-center shadow-2xl border border-purple-500/20">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-purple-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Desktop Experience Required</h2>
        <p className="text-gray-400 mb-6 leading-relaxed">
          For the best trading experience with Xoracle AI Dashboard, please access the platform from a desktop or laptop computer. Our advanced trading features require a larger screen.
        </p>
        <div className="text-sm text-purple-400/80 pt-4 border-t border-purple-500/10">
          Current device width: {typeof window !== 'undefined' ? `${window.innerWidth}px` : '0px'}
          <br />
          <span className="text-xs text-gray-500 mt-1">
            (Minimum required: 1024px)
          </span>
        </div>
      </div>
    </div>
  );
}
