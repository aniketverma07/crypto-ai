"use client";

import { useState, useEffect } from 'react';
import { IoDesktopOutline, IoCloseCircleOutline } from 'react-icons/io5';

export default function MobileWarning() {
  const [showWarning, setShowWarning] = useState(false);
  const [warningDismissed, setWarningDismissed] = useState(false);

  useEffect(() => {
    // Show warning after 5 seconds
    const timer = setTimeout(() => {
      setShowWarning(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showWarning || warningDismissed) return null;

  return (
    <div className="lg:hidden fixed inset-x-0 top-16 z-50 animate-slide-down">
      <div className="bg-[#1A1B1E] mx-2 p-4 rounded-xl border border-[#6C5DD3] shadow-lg">
        <div className="flex items-start gap-3">
          <div className="bg-[#6C5DD3] p-2 rounded-lg shrink-0">
            <IoDesktopOutline className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">Switch to Desktop</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              For the best trading experience with full features and better visualization, please use our desktop version.
            </p>
          </div>
          <button 
            onClick={() => setWarningDismissed(true)}
            className="text-gray-500 hover:text-white transition-colors shrink-0"
          >
            <IoCloseCircleOutline className="w-6 h-6" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
