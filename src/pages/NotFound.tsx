import { Podcast } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen bg-neutral-900 text-white">
      <nav className="h-16 backdrop-blur-md">
        <div className="mx-auto h-full w-full px-6">
          <div className="flex h-full items-center">
            <Link
              to="/"
              className="-mt-1 flex items-center space-x-1 text-xl font-bold"
            >
              <span>Tonic</span> <Podcast className="text-purple-400" />
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex h-[calc(100vh-4rem-3rem)] flex-col items-center justify-center px-4">
        <div className="relative">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-[120px] font-bold text-neutral-800 sm:text-[160px]">
            404
          </div>

          <div className="relative z-10 text-center">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
              Page Not Found
            </h1>
            <p className="mb-6 text-neutral-400">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>

            <div>
              <Link
                to="/home"
                className="rounded-full bg-purple-300 px-6 py-2.5 text-black transition-opacity hover:opacity-90"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="h-12 text-center text-sm text-neutral-400">
        <p>&copy; 2025 Tonic. All rights reserved.</p>
      </footer>
    </div>
  );
}
