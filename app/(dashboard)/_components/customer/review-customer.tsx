import { Star } from "lucide-react";

interface ReviewProps {
  review?: {
    comment: string;
    rating: number; // e.g. 1 to 5
  } | null;
}

export function OrderReview({ review }: ReviewProps) {
  if (!review) return null;

  return (
    <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-700/60 dark:bg-gray-800/40">
      {/* Header with Title and Star Rating */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Your Review
        </h4>

        {/* Dynamic Star Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={`${
                star <= review.rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
              }`}
            />
          ))}
          <span className="ml-1 text-xs font-bold text-gray-700 dark:text-gray-300">
            {review.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Comment Body */}
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        "{review.comment}"
      </p>
    </div>
  );
}
