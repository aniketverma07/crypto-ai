"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#13141B] flex items-center justify-center p-4">
      <div className="bg-[#1A1B1E] rounded-xl p-6 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <div className="text-red-500 text-xl font-semibold mb-3">
            Something went wrong!
          </div>
          <div className="text-gray-400 mb-6">
            {error.message || 'An unexpected error occurred'}
          </div>
          <button
            onClick={reset}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
