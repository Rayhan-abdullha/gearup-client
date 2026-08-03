"use client";

import { useEffect, useState } from "react";
import { Order, OrderStatus } from "../../_components/_types/provider-types";
import { OrderTabs } from "../../_components/provider/order-tabs";
import { OrderDetailsModal } from "../../_components/provider/details-order-modal";
import { OrdersTable } from "../../_components/provider/order-tables";
import { getProviderOrders } from "../../_actions/getProviderOrders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await getProviderOrders();
        if (res?.success) {
          setOrders(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch provider orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const formatStatusLabel = (status: string) => {
    if (!status) return "";
    return status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
    setShowActionMenu(null);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const filteredOrders =
    activeTab === "ALL" ? orders : orders.filter((o) => o.status === activeTab);

  const pendingCount = orders.filter((o) => o.status === "PLACED").length;

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
      <OrderTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        formatStatusLabel={formatStatusLabel}
      />

      {/* Orders Table */}
      {loading ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          Loading orders...
        </div>
      ) : (
        <OrdersTable
          orders={filteredOrders}
          showActionMenu={showActionMenu}
          setShowActionMenu={setShowActionMenu}
          onViewDetails={handleViewDetails}
          onStatusUpdate={handleStatusUpdate}
          formatStatusLabel={formatStatusLabel}
        />
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onStatusUpdate={handleStatusUpdate}
        formatStatusLabel={formatStatusLabel}
      />
    </div>
  );
}
