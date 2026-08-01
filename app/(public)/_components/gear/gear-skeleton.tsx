export default function GearListSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Header Skeleton */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-10 w-full rounded-lg bg-background-secondary" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="rounded-xl border border-border bg-background-secondary p-5 space-y-6">
              {/* Filter title */}
              <div className="h-6 w-24 rounded bg-background" />

              {/* Search/filter block */}
              <div className="space-y-3">
                <div className="h-4 w-20 rounded bg-background" />
                <div className="h-10 w-full rounded-lg bg-background" />
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-background" />

                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded bg-background" />
                    <div className="h-4 flex-1 rounded bg-background" />
                  </div>
                ))}
              </div>

              {/* Brands */}
              <div className="space-y-3">
                <div className="h-4 w-16 rounded bg-background" />

                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded bg-background" />
                    <div className="h-4 flex-1 rounded bg-background" />
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-background" />
                <div className="h-2 w-full rounded bg-background" />
                <div className="flex gap-3">
                  <div className="h-9 flex-1 rounded bg-background" />
                  <div className="h-9 flex-1 rounded bg-background" />
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="flex-1">
            {/* Results Header */}
            <div className="mb-8 space-y-3">
              <div className="h-8 w-48 rounded-lg bg-background-secondary" />
              <div className="h-4 w-28 rounded bg-background-secondary" />
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
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* Image */}
      <div className="aspect-[4/3] bg-background-secondary" />

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Category */}
        <div className="h-3 w-20 rounded bg-background-secondary" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 w-3/4 rounded bg-background-secondary" />
          <div className="h-4 w-full rounded bg-background-secondary" />
          <div className="h-4 w-5/6 rounded bg-background-secondary" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 rounded bg-background-secondary" />
          <div className="h-4 w-12 rounded bg-background-secondary" />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-7 w-20 rounded bg-background-secondary" />
          <div className="h-5 w-12 rounded bg-background-secondary" />
        </div>

        {/* Button */}
        <div className="h-10 w-full rounded-lg bg-background-secondary" />
      </div>
    </div>
  );
}
