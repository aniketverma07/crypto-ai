'use client'
 
import { useEffect } from 'react'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <html>
      <body>
        <div className="min-h-screen bg-[#13141B] flex items-center justify-center p-4">
          <div className="bg-[#202226] rounded-xl p-8 max-w-md w-full text-center shadow-2xl border border-red-500/20">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-white">Critical Error</h2>
            <p className="text-gray-400 mb-6">
              A critical error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => reset()}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
