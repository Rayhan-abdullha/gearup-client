export default function GearDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-5 w-32 rounded bg-background-secondary" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Left */}
          <div>
            {/* Image */}
            <div className="aspect-[4/3] rounded-2xl bg-background-secondary border border-border mb-8" />

            {/* Category */}
            <div className="h-4 w-40 rounded bg-background-secondary mb-3" />

            {/* Title */}
            <div className="h-10 w-4/5 rounded bg-background-secondary mb-4" />

            <div className="space-y-2 mb-6">
              <div className="h-4 w-full rounded bg-background-secondary" />
              <div className="h-4 w-11/12 rounded bg-background-secondary" />
              <div className="h-4 w-3/4 rounded bg-background-secondary" />
            </div>

            {/* Rating */}
            <div className="flex gap-3 mb-10">
              <div className="h-5 w-24 rounded bg-background-secondary" />
              <div className="h-5 w-20 rounded bg-background-secondary" />
            </div>

            {/* Specifications */}
            <div className="h-7 w-48 rounded bg-background-secondary mb-5" />

            <div className="space-y-3">
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </div>

            {/* Reviews */}
            <div className="h-7 w-32 rounded bg-background-secondary mt-10 mb-5" />

            <div className="space-y-4">
              <ReviewSkeleton />
              <ReviewSkeleton />
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="lg:sticky lg:top-6">
              {/* Price */}
              <div className="h-28 rounded-xl bg-background-secondary border border-border mb-6" />

              {/* Availability */}
              <div className="h-14 rounded-lg bg-background-secondary border border-border mb-6" />

              {/* Date picker */}
              <div className="h-28 rounded-lg bg-background-secondary mb-6" />

              {/* Quantity */}
              <div className="h-16 rounded-lg bg-background-secondary mb-6" />

              {/* Button */}
              <div className="h-14 rounded-lg bg-background-secondary mb-8" />

              {/* Info */}
              <div className="h-40 rounded-xl bg-background-secondary border border-border" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-background-secondary">
      <div className="h-4 w-24 rounded bg-background" />
      <div className="h-4 w-20 rounded bg-background" />
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <div className="p-5 rounded-lg bg-background-secondary border border-border">
      <div className="flex justify-between mb-4">
        <div className="h-4 w-24 rounded bg-background" />
        <div className="h-3 w-20 rounded bg-background" />
      </div>

      <div className="h-4 w-3/4 rounded bg-background" />
    </div>
  );
}
