"use client";

import React, { useState, useMemo } from "react";
import { Package, ShoppingBag, Search, ShieldAlert } from "lucide-react";

export interface Gear {
  id: string;
  title: string;
  description: string;
  brand: string;
  specifications: Record<string, string>;
  pricePerDay: number;
  stock: number;
  isAvailable: boolean;
  providerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
    slug: string;
  };
  provider: {
    name: string;
    email: string;
  };
}

export interface RentalItem {
  id: string;
  quantity: number;
  priceAtRent: number;
  startDate: string;
  endDate: string;
  orderId: string;
  gearId: string;
  gear: {
    title: string;
    brand: string;
    pricePerDay: number;
  };
}

export interface Payment {
  id: string;
  amount: number;
  gateway: string;
  status: string;
  transactionId: string;
  gatewayPayload: Record<string, unknown>;
  orderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RentalOrder {
  id: string;
  totalAmount: number;
  status: "RETURNED" | "RENTED" | "CANCELLED" | "PENDING";
  paymentStatus: "PAID" | "UNPAID" | "REFUNDED";
  transactionId: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  customer: {
    name: string;
    email: string;
  };
  items: RentalItem[];
  payment?: Payment;
}

interface ContentManagementProps {
  initialGears: Gear[];
  initialRentals: RentalOrder[];
}

export default function ContentManagementPage({
  initialGears = [],
  initialRentals = [],
}: ContentManagementProps) {
  const [gears, setGears] = useState<Gear[]>(initialGears);
  const [rentals] = useState<RentalOrder[]>(initialRentals);
  const [activeTab, setActiveTab] = useState<"gear" | "rentals">("gear");

  const [gearSearch, setGearSearch] = useState("");
  const [rentalSearch, setRentalSearch] = useState("");

  const handleToggleGearStatus = (gearId: string) => {
    setGears((prev) =>
      prev.map((g) =>
        g.id === gearId ? { ...g, isAvailable: !g.isAvailable } : g,
      ),
    );
  };

  const filteredGears = useMemo(() => {
    return gears.filter(
      (g) =>
        g.title.toLowerCase().includes(gearSearch.toLowerCase()) ||
        g.brand.toLowerCase().includes(gearSearch.toLowerCase()) ||
        g.provider.name.toLowerCase().includes(gearSearch.toLowerCase()),
    );
  }, [gears, gearSearch]);

  const filteredRentals = useMemo(() => {
    return rentals.filter(
      (r) =>
        r.id.toLowerCase().includes(rentalSearch.toLowerCase()) ||
        r.customer.name.toLowerCase().includes(rentalSearch.toLowerCase()) ||
        r.customer.email.toLowerCase().includes(rentalSearch.toLowerCase()),
    );
  }, [rentals, rentalSearch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-7 h-7 text-blue-600 dark:text-blue-500" />{" "}
              Content Moderation
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Inspect, moderate marketplace gear listings, and inspect global
              rental orders.
            </p>
          </div>
        </div>

        <div className="flex border-b border-gray-200 dark:border-gray-800 space-x-8">
          <button
            onClick={() => setActiveTab("gear")}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "gear"
                ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <Package className="w-4 h-4" />
            Gear Listings ({gears.length})
          </button>
          <button
            onClick={() => setActiveTab("rentals")}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "rentals"
                ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Rental Orders ({rentals.length})
          </button>
        </div>

        {/* Tab 1: Gear Listings Moderation */}
        {activeTab === "gear" && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by title, brand, or provider..."
                value={gearSearch}
                onChange={(e) => setGearSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGears.length > 0 ? (
                filteredGears.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="capitalize text-lg font-bold text-gray-900 dark:text-white leading-tight">
                            {item.title}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Brand: {item.brand}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                          {item.category.name}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="text-xs space-y-1 pt-1 border-t border-gray-200/60 dark:border-gray-700/60">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">
                            Provider:
                          </span>
                          <span className="font-medium">
                            {item.provider.name} ({item.provider.email})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">
                            Daily Rate / Stock:
                          </span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            ${item.pricePerDay}/day ({item.stock} in stock)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 dark:border-gray-700/60">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Status:{" "}
                        <strong
                          className={
                            item.isAvailable
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-red-500"
                          }
                        >
                          {item.isAvailable ? "Listed" : "Unlisted"}
                        </strong>
                      </span>

                      <button
                        type="button"
                        onClick={() => handleToggleGearStatus(item.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          item.isAvailable
                            ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300"
                            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300"
                        }`}
                      >
                        {item.isAvailable
                          ? "Take Down Listing"
                          : "Restore Listing"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                  No gear listings found matching your search.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Rental Orders Moderation */}
        {activeTab === "rentals" && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search order ID or customer..."
                value={rentalSearch}
                onChange={(e) => setRentalSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="overflow-x-auto border border-gray-100 dark:border-gray-800 rounded-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3">Order ID & Date</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Rented Gear</th>
                    <th className="px-4 py-3">Total / Payment</th>
                    <th className="px-4 py-3">Rental Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredRentals.length > 0 ? (
                    filteredRentals.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold truncate max-w-[140px]">
                            {order.id}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-gray-900 dark:text-white capitalize">
                            {order.customer.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {order.customer.email}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="text-xs">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {item.gear.title}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400">
                                {" "}
                                (${item.priceAtRent}/day)
                              </span>
                            </div>
                          ))}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-gray-900 dark:text-white">
                            ${order.totalAmount}
                          </div>
                          <span
                            className={`inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                              order.paymentStatus === "PAID"
                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                                : "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              order.status === "RETURNED"
                                ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm"
                      >
                        No rental orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
