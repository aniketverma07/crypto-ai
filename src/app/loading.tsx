export default function Loading() {
  return (
    <div className="min-h-screen bg-[#13141B] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 relative">
          <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 animate-spin border-t-purple-500"></div>
        </div>
        <p className="mt-4 text-gray-400">Loading Xoracle AI...</p>
      </div>
    </div>
  );
}
