"use client";

import Link from "next/link";
import {
  AlertCircle,
  Home,
  RefreshCw,
  ArrowLeft,
  CreditCard,
  Package,
} from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);
  const message = error.message?.toLowerCase() ?? "";

  let title = "Something went wrong";
  let description =
    "We're unable to complete your request right now. Please try again.";

  let Icon = AlertCircle;

  if (message.includes("payment")) {
    title = "Payment Failed";
    description =
      "Your payment couldn't be processed. If you were charged, please wait a few minutes and check your order before trying again.";
    Icon = CreditCard;
  } else if (
    message.includes("gear") ||
    message.includes("product") ||
    message.includes("fetch")
  ) {
    title = "Unable to Load Gear";
    description =
      "We couldn't load the gear list right now. Please refresh the page and try again.";
    Icon = Package;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
          <Icon className="h-10 w-10 text-red-500" />
        </div>

        <div className="bg-background-secondary border border-border rounded-2xl p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-3">
            Error
          </p>

          <h2 className="text-3xl font-bold text-foreground mb-3">{title}</h2>

          <p className="text-foreground-secondary leading-relaxed mb-6">
            {description}
          </p>

          {process.env.NODE_ENV === "development" && error.message && (
            <div className="mb-6 rounded-lg border border-border bg-background p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wide mb-2">
                Error Details
              </p>

              <p className="text-sm text-red-500 break-words">
                {error.message}
              </p>

              {error.digest && (
                <p className="mt-2 text-xs text-foreground-secondary">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light"
            >
              <RefreshCw size={18} />
              Try Again
            </button>

            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-border rounded-lg font-semibold hover:bg-background-secondary"
            >
              <Home size={18} />
              Home
            </Link>
          </div>

          <button
            onClick={() => window.history.back()}
            className="mt-5 inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-primary"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>

        <p className="mt-6 text-sm text-foreground-secondary">
          If the issue persists, please try again later.
        </p>
      </div>
    </div>
  );
}
