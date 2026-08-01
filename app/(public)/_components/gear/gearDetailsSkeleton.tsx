export default function GearDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-pulse transition-colors duration-200">
      {/* Header Skeleton */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-5 w-32 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left Column (Details) */}
          <div className="space-y-8">
            {/* Main Product Image Skeleton */}
            <div className="aspect-[4/3] w-full rounded-2xl bg-gray-200 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-800 shadow-sm" />

            {/* Category & Title */}
            <div className="space-y-3">
              <div className="h-4 w-32 rounded-full bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50" />
              <div className="h-9 w-4/5 rounded-lg bg-gray-200 dark:bg-gray-800" />
            </div>

            {/* Description Lines */}
            <div className="space-y-2.5 pt-2">
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-11/12 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
            </div>

            {/* Rating Bar */}
            <div className="flex items-center gap-3 py-2 border-y border-gray-100 dark:border-gray-800/60">
              <div className="h-5 w-28 rounded-md bg-amber-100 dark:bg-amber-950/40" />
              <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
            </div>

            {/* Specifications Section */}
            <div className="pt-2">
              <div className="h-6 w-40 rounded-md bg-gray-200 dark:bg-gray-800 mb-4" />
              <div className="space-y-2.5">
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </div>
            </div>

            {/* Reviews Section */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="h-6 w-36 rounded-md bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />
              </div>

              <div className="space-y-4">
                <ReviewSkeleton />
                <ReviewSkeleton />
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Booking Widget) */}
          <div>
            <div className="lg:sticky lg:top-8 space-y-5 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
              {/* Price Card Header */}
              <div className="flex items-baseline justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="h-8 w-32 rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
              </div>

              {/* Availability Badge */}
              <div className="h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40" />

              {/* Date Picker Input */}
              <div className="space-y-2">
                <div className="h-3.5 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-12 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60" />
              </div>

              {/* Quantity Input */}
              <div className="space-y-2">
                <div className="h-3.5 w-20 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-12 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60" />
              </div>

              {/* Action Button */}
              <div className="h-12 rounded-xl bg-blue-600/80 dark:bg-blue-600/60 mt-4" />

              {/* Guarantee / Info Box */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-3 mt-6">
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-3.5 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-3.5 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-800" />
      <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-800" />
      </div>

      <div className="h-3.5 w-24 rounded bg-amber-100 dark:bg-amber-950/40" />
      <div className="h-4 w-11/12 rounded bg-gray-200 dark:bg-gray-800" />
      <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-800" />
    </div>
  );
}
