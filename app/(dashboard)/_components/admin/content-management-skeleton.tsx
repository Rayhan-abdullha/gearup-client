import React from "react";
import Skeleton from "./skeleton";

export default function ContentManagementSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      {/* Search Input Skeleton */}
      <Skeleton className="h-10 w-full sm:w-80 rounded-xl" />

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex flex-col justify-between space-y-4"
          >
            {/* Upper Content */}
            <div className="space-y-3">
              {/* Header: Title + Brand & Category Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-36 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
                <Skeleton className="h-5 w-16 rounded" />
              </div>

              {/* Description Paragraph (2 lines) */}
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-3/4 rounded" />
              </div>

              {/* Provider & Pricing Metadata */}
              <div className="space-y-2 pt-2 border-t border-gray-200/60 dark:border-gray-700/60">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-14 rounded" />
                  <Skeleton className="h-3 w-32 rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-24 rounded" />
                  <Skeleton className="h-3 w-28 rounded" />
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 dark:border-gray-700/60">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
