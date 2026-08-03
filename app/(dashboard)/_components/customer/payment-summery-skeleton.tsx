interface PaymentSummarySkeletonProps {
  cardCount?: number;
}

export default function PaymentSummarySkeleton({
  cardCount = 3,
}: PaymentSummarySkeletonProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: cardCount }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700/60 dark:bg-gray-800"
        >
          {/* Label Skeleton */}
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

          {/* Big Value Skeleton */}
          <div className="my-3">
            <div className="h-8 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Subtext Skeleton */}
          <div className="h-3.5 w-36 animate-pulse rounded bg-gray-100 dark:bg-gray-700/60" />
        </div>
      ))}
    </div>
  );
}
