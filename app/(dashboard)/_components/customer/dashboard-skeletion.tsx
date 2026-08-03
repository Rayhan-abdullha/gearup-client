import RecentRentalsSkeleton from "./recent-orders-skeleton";

interface DashboardHeaderSkeletonProps {
  cardCount?: number;
}

export default function DashboardSkeleton({
  cardCount = 4,
}: DashboardHeaderSkeletonProps) {
  return (
    <>
      <div className="w-full">
        {/* Welcome Title Skeleton */}
        <div className="mb-8">
          <div className="h-9 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Stats Cards Grid Skeleton */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: cardCount }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700/60 dark:bg-gray-800"
            >
              {/* Top Row: Icon Container & Label */}
              <div className="flex items-center justify-between">
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-700/60" />
              </div>

              {/* Middle Row: Big Stat Value */}
              <div className="mt-4">
                <div className="h-8 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Bottom Row: Trend Line */}
              <div className="mt-4 pt-2">
                <div className="h-3.5 w-32 animate-pulse rounded bg-gray-100 dark:bg-gray-700/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <RecentRentalsSkeleton />
    </>
  );
}
