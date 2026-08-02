"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { RentalOrder } from "@/lib/types";

interface ReviewModalProps {
  order: RentalOrder;
  onClose: () => void;
}

export function ReviewModal({ order, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // await createReview({
      //   rentalId: order.id,
      //   rating,
      //   comment,
      // });

      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-bold">Leave a Review</h2>

            <p className="text-sm text-gray-500">{"title"}</p>
          </div>

          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="mb-3 block font-semibold">Rating</label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
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
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows={4}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="flex gap-3 border-t p-6">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-purple-600 px-4 py-2 text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
