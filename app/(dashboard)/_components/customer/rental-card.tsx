"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { RentalOrder } from "@/lib/types";
import { getStatusConfig } from "../../_config/getConfig";
import { createPayment } from "../../_actions/create-payment";
import { toast } from "sonner";
import { updateOrderStatusByCustomer } from "../../_actions/updateOrderStatusByCustomer";
import { OrderReview } from "./review-customer";

interface RentalCardProps {
  order: RentalOrder;
  onReview: () => void;
}

export function RentalCard({ order, onReview }: RentalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCreatePayment, setIsCreatePayment] = useState(false);
  const [isUpdateOrderStatus, setIsUpdateOrderStatusLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order.status);

  const firstItem = order.items?.[0];

  if (!firstItem) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statusClass = getStatusConfig(orderStatus);

  const handlePayment = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setIsCreatePayment(true);
      await createPayment({ orderId: order.id });
    } catch (err) {
    } finally {
      setIsCreatePayment(false);
    }
  };

  const handleOrderStatus = async (
    e: React.MouseEvent,
    status: "RETURNED" | "CANCELLED",
  ) => {
    e.stopPropagation();
    try {
      setIsUpdateOrderStatusLoading(true);
      const res = await updateOrderStatusByCustomer(order.id, status);
      if (res.success && status === "RETURNED") {
        toast.success("Order returned successfully.");
        setOrderStatus("RETURNED");
        onReview();
      } else if (res.success && status === "CANCELLED") {
        toast.success("Order cancelled successfully.");
        setOrderStatus("CANCELLED");
      } else {
        toast.error(res.message || "Failed to update order.");
      }
    } catch (err) {
      toast.error("Failed to cancel order.");
    } finally {
      setIsUpdateOrderStatusLoading(false);
    }
  };

  const handleReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReview();
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div
        className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-4">
            {/* Gear */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {firstItem.gear.title}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {firstItem.gear.brand}
              </p>

              <p className="mt-1 text-xs text-gray-400">Order ID: {order.id}</p>
            </div>

            {/* Status */}
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass.bg} ${statusClass.text}`}
            >
              {statusClass.icon}{" "}
              {orderStatus === "PLACED"
                ? "Awaiting Confirmation"
                : statusClass.label}
            </span>
          </div>
        </div>

        <ChevronDown
          size={20}
          className={`ml-4 text-gray-600 transition-transform dark:text-gray-400 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          {/* Rental Items */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Gear */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Gear
              </h4>

              <p className="font-medium text-gray-900 dark:text-white">
                {firstItem.gear.title}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {firstItem.gear.brand}
              </p>
            </div>

            {/* Rental Period */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Rental Period
              </h4>

              <p className="text-gray-900 dark:text-white">
                {formatDate(firstItem.startDate)}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                to {formatDate(firstItem.endDate)}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Quantity
              </h4>

              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {firstItem.quantity}
              </p>
            </div>

            {/* Price */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Price per Day
              </h4>

              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${firstItem.priceAtRent}
              </p>
            </div>

            {/* Total */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Total Amount
              </h4>

              <p className="text-xl font-bold text-gray-900 dark:text-white">
                ${order.totalAmount}
              </p>
            </div>

            {/* Payment Status */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Payment Status
              </h4>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass.bg} ${statusClass.text}`}
              >
                {statusClass.icon} {order.paymentStatus}
              </span>
            </div>

            {/* Transaction */}
            {order.transactionId && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Transaction ID
                </h4>

                <p className="break-all font-mono text-sm text-gray-900 dark:text-white">
                  {order.transactionId}
                </p>
              </div>
            )}

            {/* Order Date */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Order Date
              </h4>

              <p className="text-gray-900 dark:text-white">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            {orderStatus === "PENDING" && (
              <button
                onClick={handlePayment}
                className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {isCreatePayment ? "Creating Payment..." : "Pay Now"}
              </button>
            )}

            {orderStatus === "PICKED_UP" && (
              <button
                onClick={(e) => handleOrderStatus(e, "RETURNED")}
                className="cursor-pointer flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
              >
                <MessageCircle size={16} />
                {isUpdateOrderStatus ? "Updating Status..." : "Return"}
              </button>
            )}

            {orderStatus === "RETURNED" && order.review === null && (
              <button
                onClick={handleReview}
                className="cursor-pointer flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <MessageCircle size={16} />
                {isUpdateOrderStatus ? "Reviewing..." : "Leave a Review"}
              </button>
            )}

            {orderStatus === "CONFIRMED" && (
              <button
                onClick={handlePayment}
                className="cursor-pointer flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
              >
                <MessageCircle size={16} />
                {isCreatePayment ? "Creating Payment..." : "Pay Now"}
              </button>
            )}

            {orderStatus === "PLACED" && (
              <button
                onClick={(e) => handleOrderStatus(e, "CANCELLED")}
                className="cursor-pointer flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                <MessageCircle size={16} />
                {isUpdateOrderStatus ? "Cancelling..." : "Cancell Order"}
              </button>
            )}
          </div>

          {/* show reivew */}
          {order.review && orderStatus === "RETURNED" && (
            <OrderReview review={order.review} />
          )}
        </div>
      )}
    </div>
  );
}
