export default function Loading() {
  return (
    <div className="min-h-screen bg-[#13141B] p-4 lg:p-6">
      <div className="max-w-[1400px] mx-auto space-y-4 lg:space-y-6">
        {/* Market Overview Loading */}
        <div className="bg-[#1A1B1E] rounded-xl p-4 lg:p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-[#2A2C32] rounded w-48 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[140px] bg-[#2A2C32] rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Chart Loading */}
        <div className="bg-[#1A1B1E] rounded-xl p-4 lg:p-6">
          <div className="animate-pulse">
            <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-12 bg-[#2A2C32] rounded-lg"></div>
                ))}
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-12 bg-[#2A2C32] rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="h-[400px] bg-[#2A2C32] rounded-xl"></div>
          </div>
        </div>

        {/* Trading Tips Loading */}
        <div className="bg-[#1A1B1E] rounded-xl p-4 lg:p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-[#2A2C32] rounded w-48 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-[#2A2C32] rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Other Sections Loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div className="space-y-4 lg:space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-[#1A1B1E] rounded-xl p-4 lg:p-6">
                <div className="animate-pulse">
                  <div className="h-8 bg-[#2A2C32] rounded w-48 mb-4"></div>
                  <div className="h-[200px] bg-[#2A2C32] rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4 lg:space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#1A1B1E] rounded-xl p-4 lg:p-6">
                <div className="animate-pulse">
                  <div className="h-8 bg-[#2A2C32] rounded w-48 mb-4"></div>
                  <div className="h-[150px] bg-[#2A2C32] rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
