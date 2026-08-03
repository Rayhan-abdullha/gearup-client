"use client";
import { X, Package, CheckCircle2, Truck, XCircle, Clock } from "lucide-react";
import { Order, OrderStatus } from "../_types/provider-types";

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
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

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  onStatusUpdate,
  formatStatusLabel,
}: OrderDetailsModalProps) {
  if (!isOpen || !order) return null;

  const nextStep = NEXT_STATUS[order.status];

  const formatDate = (isoString: string) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toISOString().split("T")[0];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-lg dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Order Details - #{order.id.slice(0, 8)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">
          {/* Customer Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Customer Information
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {order.customer?.name}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {order.customer?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Gear Info / Line Items */}
          <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Rented Items
            </h3>
            <div className="mt-3 space-y-4">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-700/50"
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Gear Title
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.gear?.title} ({item.gear?.brand})
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Daily Price
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ${item.priceAtRent}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Rental Start
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatDate(item.startDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Rental End
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatDate(item.endDate)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Payment Status
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {order.paymentStatus}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Total Price
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${order.totalAmount?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Current Status
              </p>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                {formatStatusLabel(order.status)}
              </span>
            </div>
            {nextStep && (
              <button
                onClick={() => {
                  onStatusUpdate(order.id, nextStep);
                  onClose();
                }}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Mark as {formatStatusLabel(nextStep)}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
