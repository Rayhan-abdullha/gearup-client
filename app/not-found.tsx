"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12 transition-colors duration-200">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Visual Graphic Element */}
        <div className="relative flex justify-center">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 max-w-xs mx-auto bg-blue-500/10 dark:bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
            <Compass className="w-14 h-14 text-blue-600 dark:text-blue-500 animate-pulse" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 rounded-full">
            404 Error
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Page not found
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            Sorry, we couldn’t find the page or rental item you were looking
            for. It might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Secondary Back Action */}
        <div className="pt-4 border-t border-gray-200/60 dark:border-gray-800/60">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back to previous page
          </button>
        </div>
      </div>
    </div>
  );
}
