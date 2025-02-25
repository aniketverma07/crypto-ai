import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#13141B] flex items-center justify-center p-4">
      <div className="bg-[#1A1B1E] rounded-xl p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-2">404 - Page Not Found</h2>
        <p className="text-gray-400 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
