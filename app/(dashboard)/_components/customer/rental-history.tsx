"use client";

import { RentalOrder } from "@/lib/types";
import { useState } from "react";
import { ReviewModal } from "./review-modal";
import { RentalCard } from "./rental-card";

interface RentalHistoryProps {
  rentals: RentalOrder[];
}

export default function RentalHistory({ rentals }: RentalHistoryProps) {
  const [selectedFilter, setSelectedFilter] = useState<
    "ALL" | "ACTIVE" | "COMPLETED"
  >("ALL");

  const [selectedOrderForReview, setSelectedOrderForReview] =
    useState<RentalOrder | null>(null);

  const filteredOrders = rentals.filter((order) => {
    if (selectedFilter === "ACTIVE") {
      return ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"].includes(
        order.status,
      );
    }

    if (selectedFilter === "COMPLETED") {
      return ["RETURNED", "CANCELLED"].includes(order.status);
    }

    return true;
  });

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Rental History</h1>

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto border-b border-gray-200 dark:border-gray-700">
        <div className="flex min-w-max gap-1">
          {[
            { value: "ALL", label: "All Rentals" },
            { value: "ACTIVE", label: "Active" },
            { value: "COMPLETED", label: "Completed" },
          ].map((tab) => {
            const isActive = selectedFilter === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() =>
                  setSelectedFilter(tab.value as "ALL" | "ACTIVE" | "COMPLETED")
                }
                className={`relative px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {tab.label}

                {/* Active indicator */}
                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
      {/* Rentals */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <RentalCard
            key={order.id}
            order={order}
            onReview={() => setSelectedOrderForReview(order)}
          />
        ))}
      </div>

      {/* Review Modal */}
      {selectedOrderForReview && (
        <ReviewModal
          order={selectedOrderForReview}
          onClose={() => setSelectedOrderForReview(null)}
        />
      )}
    </>
  );
}
