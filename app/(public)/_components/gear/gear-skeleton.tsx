export default function GearListSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-pulse transition-colors duration-200">
      {/* Header Skeleton */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-10 w-full rounded-xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter Skeleton */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-6 shadow-sm">
              {/* Filter Title */}
              <div className="h-6 w-24 rounded-md bg-gray-200 dark:bg-gray-800" />

              {/* Search input placeholder */}
              <div className="space-y-2">
                <div className="h-3.5 w-16 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-10 w-full rounded-lg bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60" />
              </div>

              {/* Categories */}
              <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-4 flex-1 rounded bg-gray-100 dark:bg-gray-800/60" />
                  </div>
                ))}
              </div>

              {/* Brands */}
              <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-4 flex-1 rounded bg-gray-100 dark:bg-gray-800/60" />
                  </div>
                ))}
              </div>

              {/* Price Range */}
              <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="flex gap-3">
                  <div className="h-9 flex-1 rounded-lg bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60" />
                  <div className="h-9 flex-1 rounded-lg bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60" />
                </div>
              </div>
            </div>
          </aside>

          {/* Catalog Grid Section */}
          <section className="flex-1">
            {/* Results Header */}
            <div className="mb-6 space-y-2">
              <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-800" />
            </div>

            {/* Gear Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <GearCardSkeleton key={item} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function GearCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex flex-col justify-between">
      <div>
        {/* Card Image */}
        <div className="aspect-[4/3] w-full bg-gray-200 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-800" />

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Category Badge */}
          <div className="h-4 w-20 rounded-full bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50" />

          {/* Title and Short Description */}
          <div className="space-y-2">
            <div className="h-5 w-3/4 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-3.5 w-full rounded bg-gray-100 dark:bg-gray-800/60" />
            <div className="h-3.5 w-5/6 rounded bg-gray-100 dark:bg-gray-800/60" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 pt-1">
            <div className="h-4 w-20 rounded bg-amber-100 dark:bg-amber-950/40" />
            <div className="h-3.5 w-10 rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Price Tag */}
          <div className="flex items-baseline justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="h-6 w-24 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-12 rounded bg-emerald-100 dark:bg-emerald-950/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
