interface OrderRowSkeletonProps {
  count?: number;
}

export default function RenatalHistorySkeleton({
  count = 5,
}: OrderRowSkeletonProps) {
  return (
    <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center justify-between p-4">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              {/* Gear Details Skeleton */}
              <div className="flex-1 space-y-2">
                {/* Gear Title */}
                <div className="h-5 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

                {/* Brand */}
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

                {/* Order ID */}
                <div className="h-3 w-32 animate-pulse rounded bg-gray-100 dark:bg-gray-700/60" />
              </div>

              {/* Status Badge Skeleton */}
              <div className="h-6 w-32 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>

          {/* Chevron Icon Placeholder */}
          <div className="ml-4 h-5 w-5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
}
