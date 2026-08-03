"use client";

import {
  CheckCircle2,
  Truck,
  Package,
  MoreVertical,
  XCircle,
  Clock,
} from "lucide-react";

import React from "react";
import { Order, OrderStatus } from "../_types/provider-types";
import { getProviderStatusColor } from "../../_config/getConfig";
import { updaeOrderByProvider } from "../../_actions/updateOrderByProvider";
import { toast } from "sonner";

interface OrdersTableProps {
  orders: Order[];
  showActionMenu: string | null;
  setShowActionMenu: React.Dispatch<React.SetStateAction<string | null>>;
  onViewDetails: (order: Order) => void;
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => void;
  formatStatusLabel: (status: string) => string;
}

const NEXT_STATUS: Record<OrderStatus, OrderStatus | null> = {
  PLACED: "CONFIRMED",
  CONFIRMED: "PAID",
  PAID: "PICKED_UP",
  PICKED_UP: "RETURNED",
  RETURNED: null,
  CANCELLED: null,
};

export function OrdersTable({
  orders,
  showActionMenu,
  setShowActionMenu,
  onViewDetails,
  onStatusUpdate,
  formatStatusLabel,
}: OrdersTableProps) {
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "PLACED":
        return <Package size={14} />;
      case "CONFIRMED":
      case "PAID":
        return <CheckCircle2 size={14} />;
      case "PICKED_UP":
        return <Truck size={14} />;
      case "RETURNED":
        return <CheckCircle2 size={14} />;
      case "CANCELLED":
        return <XCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toISOString().split("T")[0];
  };

  const handleUpdateOrder = async (
    orderId: string,
    newStatus: "CONFIRMED" | "CANCELLED" | "PICKED_UP",
  ) => {
    try {
      const res = await updaeOrderByProvider(orderId, newStatus);
      if (res.success) {
        setShowActionMenu(null);
        onStatusUpdate(orderId, newStatus);
        toast.success("Order updated successfully.");
      } else {
        toast.error(res.message || "Failed to update order.");
      }
    } catch (error) {
      toast.error("Failed to update order.");
    }
  };

  return (
    <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700">
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Order ID
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Customer
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Gear
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Rental Dates
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Price
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const primaryItem = order.items?.[0];
                const extraItemsCount = (order.items?.length || 0) - 1;
                const nextStep = NEXT_STATUS[order.status];

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td
                      className="px-6 py-4 font-semibold text-gray-900 dark:text-white"
                      title={order.id}
                    >
                      #{order.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {order.customer?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {order.customer?.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        <span>{primaryItem?.gear?.title || "N/A"}</span>
                        {extraItemsCount > 0 && (
                          <span className="ml-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                            +{extraItemsCount} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex flex-col">
                        <span>{formatDate(primaryItem?.startDate)}</span>
                        <span className="text-xs text-gray-500">
                          to {formatDate(primaryItem?.endDate)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${order.totalAmount?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getProviderStatusColor(
                          order.status,
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {formatStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowActionMenu(
                              showActionMenu == order.id ? null : order.id,
                            )
                          }
                          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                          <MoreVertical size={20} />
                        </button>

                        {showActionMenu === order.id && (
                          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                            <button
                              onClick={() => {
                                onViewDetails(order);
                                setShowActionMenu(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              View Details
                            </button>
                            {order.status === "PLACED" && (
                              <button
                                onClick={() =>
                                  handleUpdateOrder(order.id, "CONFIRMED")
                                }
                                className="w-full border-t border-gray-200 px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-100 dark:border-gray-700 dark:text-blue-400 dark:hover:bg-gray-700"
                              >
                                Mark as Confirmed
                              </button>
                            )}
                            {order.status === "PAID" && (
                              <button
                                onClick={() =>
                                  handleUpdateOrder(order.id, "PICKED_UP")
                                }
                                className="w-full border-t border-gray-200 px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-100 dark:border-gray-700 dark:text-blue-400 dark:hover:bg-gray-700"
                              >
                                Mark as Pickup
                              </button>
                            )}
                            {order.status === "PLACED" && (
                              <button
                                onClick={() =>
                                  handleUpdateOrder(order.id, "CANCELLED")
                                }
                                className="w-full border-t border-gray-200 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:border-gray-700 dark:text-red-400 dark:hover:bg-gray-700"
                              >
                                Cancel Order
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
