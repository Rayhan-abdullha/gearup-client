import React from "react";

interface RecentRentalsSkeletonProps {
  rowCount?: number;
}

export default function RecentRentalsSkeleton({
  rowCount = 5,
}: RecentRentalsSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm dark:border-gray-700/60 dark:bg-gray-800">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <div className="h-6 w-36 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-20 animate-pulse rounded-md bg-gray-100 dark:bg-gray-700/50" />
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* Table Head */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/50">
              <th className="px-6 py-3.5">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </th>
              <th className="px-6 py-3.5">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </th>
              <th className="px-6 py-3.5">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </th>
              <th className="px-6 py-3.5">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </th>
              <th className="px-6 py-3.5">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </th>
            </tr>
          </thead>

          {/* Table Body Rows */}
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {Array.from({ length: rowCount }).map((_, index) => (
              <tr key={index} className="transition-colors">
                {/* Order ID */}
                <td className="px-6 py-4">
                  <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                </td>

                {/* Gear Title */}
                <td className="px-6 py-4">
                  <div className="h-4 w-44 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                </td>

                {/* Duration */}
                <td className="px-6 py-4">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                </td>

                {/* Amount */}
                <td className="px-6 py-4">
                  <div className="h-4 w-14 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
