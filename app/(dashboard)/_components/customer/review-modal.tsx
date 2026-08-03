"use client";

import { useActionState, useEffect, useState } from "react";
import { X } from "lucide-react";
import { RentalOrder } from "@/lib/types";
import { submitReviewActions } from "../../_actions/createReview";

interface ReviewModalProps {
  order: RentalOrder;
  onClose: () => void;
}

interface ReviewState {
  success: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  success: false,
  error: null,
};

export function ReviewModal({ order, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // wrap submitReviewActions to match useActionState expected signature (state, payload)
  const wrappedSubmit = (s: ReviewState, formData: FormData) =>
    submitReviewActions(s, formData, order.items[0].gearId, order.id);

  const [state, formAction, isPending] = useActionState(
    wrappedSubmit,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-bold">Leave a Review</h2>
            <p className="text-sm text-gray-500">{"title"}</p>
          </div>

          <button type="button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form action={formAction}>
          <div className="p-6">
            <div className="mb-6">
              <label className="mb-3 block font-semibold">Rating</label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={
                      star <= rating
                        ? "text-3xl text-yellow-400"
                        : "text-3xl text-gray-300"
                    }
                  >
                    ★
                  </button>
                ))}
              </div>

              <input type="hidden" name="rating" value={rating} />
            </div>

            <textarea
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              className="w-full rounded-lg border p-3"
            />

            {state.error && (
              <p className="mt-2 text-sm text-red-500">{state.error}</p>
            )}
          </div>

          <div className="flex gap-3 border-t p-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-lg bg-purple-600 px-4 py-2 text-white"
            >
              {isPending ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
