import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { logoImg } from "../data/initialServices";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <img src={logoImg} alt="Magic Home" className="h-12 w-auto object-contain opacity-80" />
        </div>
        <h1 className="text-8xl sm:text-9xl mb-4 text-white/10 select-none" style={{ fontFamily: "Georgia, serif" }}>404</h1>
        <h2 className="text-2xl sm:text-3xl mb-4 text-white" style={{ fontFamily: "Georgia, serif" }}>Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black rounded-lg transition-all hover:-translate-y-0.5 text-sm"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}