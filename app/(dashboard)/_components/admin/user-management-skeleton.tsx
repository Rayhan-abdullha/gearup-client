import React from "react";
import Skeleton from "./skeleton";
export default function UserManagementSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-56 rounded-xl" />
            <Skeleton className="h-4 w-80 rounded-lg" />
          </div>
          <Skeleton className="h-9 w-40 rounded-xl" />
        </div>

        {/* Data Card Container Skeleton */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          {/* Controls Bar Skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Skeleton className="h-10 w-full sm:w-80 rounded-xl" />
            <Skeleton className="h-10 w-full sm:w-36 rounded-xl" />
          </div>

          {/* Table Skeleton */}
          <div className="overflow-x-auto border border-gray-100 dark:border-gray-800 rounded-xl">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3">
                    <Skeleton className="h-3 w-28 rounded" />
                  </th>
                  <th className="px-4 py-3">
                    <Skeleton className="h-3 w-16 rounded" />
                  </th>
                  <th className="px-4 py-3">
                    <Skeleton className="h-3 w-16 rounded" />
                  </th>
                  <th className="px-4 py-3">
                    <Skeleton className="h-3 w-20 rounded" />
                  </th>
                  <th className="px-4 py-3 text-right">
                    <Skeleton className="h-3 w-16 rounded ml-auto" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 space-y-2">
                      <Skeleton className="h-4 w-36 rounded" />
                      <Skeleton className="h-3 w-48 rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-3 w-24 rounded" />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Skeleton className="h-8 w-20 rounded-lg ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <Skeleton className="h-4 w-32 rounded" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
