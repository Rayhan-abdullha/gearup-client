"use client";

import { useState } from "react";
import { CheckCircle2, Truck, Package, MoreVertical, X } from "lucide-react";
import type React from "react";

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  gear: {
    name: string;
    price: number;
  };
  dates: {
    start: string;
    end: string;
  };
  status: "pending" | "confirmed" | "picked_up" | "returned";
  totalPrice: number;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: {
        name: "John Smith",
        email: "john@example.com",
        phone: "+1-555-0123",
      },
      gear: {
        name: "Mountain Bike",
        price: 45.99,
      },
      dates: {
        start: "2024-08-01",
        end: "2024-08-05",
      },
      status: "pending",
      totalPrice: 229.95,
      createdAt: "2024-08-01",
    },
    {
      id: "ORD-002",
      customer: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "+1-555-0124",
      },
      gear: {
        name: "Ski Equipment Set",
        price: 65.99,
      },
      dates: {
        start: "2024-07-31",
        end: "2024-08-03",
      },
      status: "confirmed",
      totalPrice: 263.96,
      createdAt: "2024-07-31",
    },
    {
      id: "ORD-003",
      customer: {
        name: "Mike Chen",
        email: "mike@example.com",
        phone: "+1-555-0125",
      },
      gear: {
        name: "Camping Tent",
        price: 25.99,
      },
      dates: {
        start: "2024-07-25",
        end: "2024-07-30",
      },
      status: "picked_up",
      totalPrice: 129.95,
      createdAt: "2024-07-25",
    },
    {
      id: "ORD-004",
      customer: {
        name: "Emma Wilson",
        email: "emma@example.com",
        phone: "+1-555-0126",
      },
      gear: {
        name: "Mountain Bike",
        price: 45.99,
      },
      dates: {
        start: "2024-07-20",
        end: "2024-07-25",
      },
      status: "returned",
      totalPrice: 229.95,
      createdAt: "2024-07-20",
    },
    {
      id: "ORD-005",
      customer: {
        name: "David Brown",
        email: "david@example.com",
        phone: "+1-555-0127",
      },
      gear: {
        name: "Camping Tent",
        price: 25.99,
      },
      dates: {
        start: "2024-08-02",
        end: "2024-08-06",
      },
      status: "pending",
      totalPrice: 129.95,
      createdAt: "2024-08-02",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "picked_up":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "returned":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package size={16} />;
      case "confirmed":
        return <CheckCircle2 size={16} />;
      case "picked_up":
        return <Truck size={16} />;
      case "returned":
        return <CheckCircle2 size={16} />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    return (
      status.replace("_", " ").charAt(0).toUpperCase() +
      status.slice(1).replace("_", " ")
    );
  };

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
    setShowActionMenu(null);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const nextStatus: Record<Order["status"], Order["status"]> = {
    pending: "confirmed",
    confirmed: "picked_up",
    picked_up: "returned",
    returned: "returned",
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Order Management
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage incoming rental orders and track rental status.
          <span className="ml-2 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800 dark:bg-red-900 dark:text-red-200">
            {pendingCount} pending
          </span>
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
        {["all", "pending", "confirmed", "picked_up", "returned"].map(
          (status) => (
            <button
              key={status}
              className={`border-b-2 px-4 py-2 font-medium transition-colors ${
                status === "all"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {status === "all" ? "All Orders" : getStatusLabel(status)}
            </button>
          ),
        )}
      </div>

      {/* Orders Table */}
      <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Gear
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Rental Dates
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.customer.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {order.customer.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {order.gear.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex flex-col">
                      <span>{order.dates.start}</span>
                      <span className="text-xs text-gray-500">
                        to {order.dates.end}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowActionMenu(
                            showActionMenu === order.id ? null : order.id,
                          )
                        }
                        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {/* Dropdown Menu */}
                      {showActionMenu === order.id && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                          <button
                            onClick={() => handleViewDetails(order)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            View Details
                          </button>
                          {order.status !== "returned" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    order.id,
                                    nextStatus[order.status],
                                  )
                                }
                                className="w-full border-t border-gray-200 px-4 py-2 text-left text-blue-600 hover:bg-gray-100 dark:border-gray-700 dark:text-blue-400 dark:hover:bg-gray-700"
                              >
                                Mark as{" "}
                                {getStatusLabel(nextStatus[order.status])}
                              </button>
                            </>
                          )}
                          <button className="w-full border-t border-gray-200 px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:border-gray-700 dark:text-red-400 dark:hover:bg-gray-700">
                            Cancel Order
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-lg dark:bg-gray-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Order Details - {selectedOrder.id}
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 p-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Customer Information
                </h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Name
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedOrder.customer.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedOrder.customer.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedOrder.customer.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gear Info */}
              <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Gear Details
                </h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Gear Name
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedOrder.gear.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Daily Price
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ${selectedOrder.gear.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rental Period */}
              <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Rental Period
                </h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Start Date
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedOrder.dates.start}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      End Date
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedOrder.dates.end}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Price */}
              <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Total Price
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${selectedOrder.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <div className="mb-4">
                  <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Current Status
                  </p>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                      selectedOrder.status,
                    )}`}
                  >
                    {getStatusIcon(selectedOrder.status)}
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>
                {selectedOrder.status !== "returned" && (
                  <button
                    onClick={() => {
                      handleStatusUpdate(
                        selectedOrder.id,
                        nextStatus[selectedOrder.status],
                      );
                      setShowDetailModal(false);
                    }}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Mark as {getStatusLabel(nextStatus[selectedOrder.status])}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
