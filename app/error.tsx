"use client";

import Link from "next/link";
import { AlertCircle, Home, RefreshCw, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>

        {/* Error Content */}
        <div className="bg-background-secondary border border-border rounded-2xl p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-3">
            Error
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-3">
            Something went wrong!
          </h2>

          <p className="text-foreground-secondary leading-relaxed mb-6">
            We couldn&apos;t load this page right now. Please try again or
            return to the homepage.
          </p>

          {/* Error message - useful during development */}
          {process.env.NODE_ENV === "development" && error?.message && (
            <div className="mb-6 rounded-lg border border-border bg-background p-4 text-left">
              <p className="text-xs font-semibold text-foreground-secondary uppercase tracking-wide mb-2">
                Error Details
              </p>

              <p className="text-sm text-red-500 break-words">
                {error.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors"
            >
              <RefreshCw size={18} />
              Try Again
            </button>

            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-background-secondary transition-colors"
            >
              <Home size={18} />
              Home
            </Link>
          </div>

          {/* Back link */}
          <button
            onClick={() => window.history.back()}
            className="mt-5 inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-sm text-foreground-secondary">
          If the problem continues, please try again later.
        </p>
      </div>
    </div>
  );
}
