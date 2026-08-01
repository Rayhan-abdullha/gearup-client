"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, X } from "lucide-react";

interface RentalOrder {
  id: string;
  gear: {
    title: string;
    brand: string;
    price: number;
  };
  status:
    | "PLACED"
    | "CONFIRMED"
    | "PAID"
    | "PICKED_UP"
    | "RETURNED"
    | "CANCELLED";
  startDate: string;
  endDate: string;
  quantity: number;
  totalAmount: number;
  transactionId?: string;
  createdAt: string;
  daysRemaining?: number;
}

const rentalOrders: RentalOrder[] = [
  {
    id: "ORD-2026-001",
    gear: { title: "Mountain Bike Pro", brand: "Trek", price: 60 },
    status: "PICKED_UP",
    startDate: "2026-01-15",
    endDate: "2026-01-20",
    quantity: 1,
    totalAmount: 300,
    transactionId: "txn_1234567890",
    createdAt: "2026-01-10",
    daysRemaining: 3,
  },
  {
    id: "ORD-2026-002",
    gear: { title: "Camping Tent 4P", brand: "Coleman", price: 25 },
    status: "RETURNED",
    startDate: "2026-01-08",
    endDate: "2026-01-11",
    quantity: 1,
    totalAmount: 75,
    transactionId: "txn_0987654321",
    createdAt: "2026-01-05",
  },
  {
    id: "ORD-2026-003",
    gear: { title: "Fishing Rod Set", brand: "PLUSINNO", price: 20 },
    status: "CONFIRMED",
    startDate: "2026-01-25",
    endDate: "2026-01-30",
    quantity: 1,
    totalAmount: 100,
    createdAt: "2026-01-22",
  },
  {
    id: "ORD-2026-004",
    gear: { title: "Kayak Double", brand: "Lifetime", price: 150 },
    status: "PLACED",
    startDate: "2026-02-01",
    endDate: "2026-02-05",
    quantity: 1,
    totalAmount: 600,
    createdAt: "2026-01-28",
  },
  {
    id: "ORD-2026-005",
    gear: { title: "Skateboard Pro", brand: "Element", price: 15 },
    status: "CANCELLED",
    startDate: "2026-01-30",
    endDate: "2026-02-02",
    quantity: 1,
    totalAmount: 60,
    createdAt: "2026-01-29",
  },
];

export default function RentalHistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState<
    "ALL" | "ACTIVE" | "COMPLETED"
  >("ALL");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrderForReview, setSelectedOrderForReview] =
    useState<RentalOrder | null>(null);

  const getStatusConfig = (status: string) => {
    const config: Record<
      string,
      { bg: string; text: string; label: string; icon: string }
    > = {
      PLACED: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Awaiting Confirmation",
        icon: "⏳",
      },
      CONFIRMED: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Confirmed",
        icon: "✓",
      },
      PAID: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        label: "Payment Received",
        icon: "💳",
      },
      PICKED_UP: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Picked Up",
        icon: "✓",
      },
      RETURNED: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        label: "Returned",
        icon: "↩",
      },
      CANCELLED: {
        bg: "bg-red-100",
        text: "text-red-800",
        label: "Cancelled",
        icon: "✕",
      },
    };
    return config[status] || config.PLACED;
  };

  const filteredOrders = rentalOrders.filter((order) => {
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

  const handleReviewClick = (order: RentalOrder) => {
    setSelectedOrderForReview(order);
    setShowReviewModal(true);
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Rental History
      </h1>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {["ALL", "ACTIVE", "COMPLETED"].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setSelectedFilter(tab as "ALL" | "ACTIVE" | "COMPLETED")
            }
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedFilter === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            {tab === "ALL"
              ? "All Rentals"
              : tab === "ACTIVE"
                ? "Active"
                : "Completed"}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const isExpanded = expandedOrder === order.id;

            return (
              <div
                key={order.id}
                className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                {/* Order Header */}
                <div
                  className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {order.gear.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Order ID: {order.id}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`ml-4 text-gray-600 transition-transform dark:text-gray-400 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </div>

                {/* Order Details - Expanded */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {/* Rental Period */}
                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                          Rental Period
                        </h4>
                        <p className="text-gray-900 dark:text-white">
                          {order.startDate} to {order.endDate}
                        </p>
                      </div>

                      {/* Gear Details */}
                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                          Gear Details
                        </h4>
                        <p className="text-gray-900 dark:text-white">
                          {order.gear.brand}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Qty: {order.quantity}
                        </p>
                      </div>

                      {/* Amount */}
                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                          Total Amount
                        </h4>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          ${order.totalAmount}
                        </p>
                      </div>

                      {/* Transaction ID */}
                      {order.transactionId && (
                        <div>
                          <h4 className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                            Transaction ID
                          </h4>
                          <p className="font-mono text-sm text-gray-900 dark:text-white">
                            {order.transactionId}
                          </p>
                        </div>
                      )}

                      {/* Days Remaining */}
                      {order.daysRemaining && order.status === "PICKED_UP" && (
                        <div>
                          <h4 className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                            Days Remaining
                          </h4>
                          <p className="text-lg font-bold text-green-600">
                            {order.daysRemaining} days
                          </p>
                        </div>
                      )}

                      {/* Created Date */}
                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                          Order Date
                        </h4>
                        <p className="text-gray-900 dark:text-white">
                          {order.createdAt}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {order.status === "PLACED" && (
                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                          Pay Now
                        </button>
                      )}
                      {order.status === "CONFIRMED" && (
                        <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                          Mark as Picked Up
                        </button>
                      )}
                      {order.status === "PAID" && (
                        <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                          I&apos;ve Picked It Up
                        </button>
                      )}
                      {order.status === "PICKED_UP" && (
                        <button className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
                          Mark as Returned
                        </button>
                      )}
                      {order.status === "RETURNED" && (
                        <button
                          onClick={() => handleReviewClick(order)}
                          className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
                        >
                          <MessageCircle size={16} />
                          Leave Review
                        </button>
                      )}
                      <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        View Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              No rentals found in this category
            </p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedOrderForReview && (
        <ReviewModal
          order={selectedOrderForReview}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedOrderForReview(null);
          }}
        />
      )}
    </div>
  );
}

interface ReviewModalProps {
  order: RentalOrder;
  onClose: () => void;
}

function ReviewModal({ order, onClose }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Review submitted!\nRating: ${rating} stars\nComment: ${comment}`);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Leave a Review
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {order.gear.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Rating */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-900 dark:text-white">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl transition-colors ${
                    star <= rating
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-900 dark:text-white">
              Comment (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this gear..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              rows={4}
            />
          </div>

          {/* Summary */}
          <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You are reviewing:{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {order.gear.title}
              </span>
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Rental period:{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {order.startDate} to {order.endDate}
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-gray-200 p-6 dark:border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
