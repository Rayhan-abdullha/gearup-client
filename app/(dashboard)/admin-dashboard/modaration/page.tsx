"use client";

import { useState } from "react";
import {
  Search,
  AlertTriangle,
  CheckCircle,
  Eye,
  Trash2,
  Flag,
} from "lucide-react";

interface GearListing {
  id: string;
  name: string;
  provider: string;
  category: string;
  price: number;
  status: "active" | "flagged" | "removed";
  flags: number;
  postedDate: string;
  thumbnail?: string;
}

interface RentalOrder {
  id: string;
  customer: string;
  provider: string;
  gear: string;
  rentalDate: string;
  status: "active" | "returned" | "disputed";
  disputed: boolean;
  totalAmount: number;
}

export default function ContentModerationPage() {
  const [activeTab, setActiveTab] = useState<"gear" | "orders">("gear");
  const [searchTerm, setSearchTerm] = useState("");
  const [gearStatusFilter, setGearStatusFilter] = useState<
    "all" | "active" | "flagged" | "removed"
  >("all");
  const [orderStatusFilter, setOrderStatusFilter] = useState<
    "all" | "active" | "returned" | "disputed"
  >("all");
  const [selectedGear, setSelectedGear] = useState<GearListing | null>(null);
  const [isGearModalOpen, setIsGearModalOpen] = useState(false);

  const gearListings: GearListing[] = [
    {
      id: "GEAR-001",
      name: "Mountain Bike - Full Suspension",
      provider: "Alpine Sports Hub",
      category: "Bikes",
      price: 45,
      status: "active",
      flags: 0,
      postedDate: "Feb 18, 2024",
    },
    {
      id: "GEAR-002",
      name: "Professional Camera Bundle",
      provider: "Urban Adventure",
      category: "Cameras",
      price: 120,
      status: "flagged",
      flags: 3,
      postedDate: "Feb 15, 2024",
    },
    {
      id: "GEAR-003",
      name: "Camping Tent 4-Person",
      provider: "Coastal Gear Rentals",
      category: "Camping",
      price: 25,
      status: "active",
      flags: 0,
      postedDate: "Feb 10, 2024",
    },
    {
      id: "GEAR-004",
      name: "Counterfeit Sports Watch",
      provider: "Unknown Provider",
      category: "Electronics",
      price: 180,
      status: "removed",
      flags: 12,
      postedDate: "Feb 8, 2024",
    },
    {
      id: "GEAR-005",
      name: "Skiing Equipment Set",
      provider: "Peak Performance",
      category: "Winter Sports",
      price: 85,
      status: "active",
      flags: 0,
      postedDate: "Feb 5, 2024",
    },
    {
      id: "GEAR-006",
      name: "Surfboard - Beginner Level",
      provider: "Coastal Gear Rentals",
      category: "Water Sports",
      price: 35,
      status: "active",
      flags: 0,
      postedDate: "Feb 1, 2024",
    },
  ];

  const rentalOrders: RentalOrder[] = [
    {
      id: "ORD-001",
      customer: "John Smith",
      provider: "Alpine Sports Hub",
      gear: "Mountain Bike - Full Suspension",
      rentalDate: "Feb 20 - Feb 22, 2024",
      status: "active",
      disputed: false,
      totalAmount: 135,
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      provider: "Coastal Gear Rentals",
      gear: "Camping Tent 4-Person",
      rentalDate: "Feb 18 - Feb 25, 2024",
      status: "active",
      disputed: false,
      totalAmount: 175,
    },
    {
      id: "ORD-003",
      customer: "Mike Davis",
      provider: "Urban Adventure",
      gear: "Professional Camera Bundle",
      rentalDate: "Feb 10 - Feb 15, 2024",
      status: "returned",
      disputed: true,
      totalAmount: 600,
    },
    {
      id: "ORD-004",
      customer: "Emily Rodriguez",
      provider: "Peak Performance",
      gear: "Skiing Equipment Set",
      rentalDate: "Feb 19 - Feb 21, 2024",
      status: "active",
      disputed: false,
      totalAmount: 170,
    },
    {
      id: "ORD-005",
      customer: "David Chen",
      provider: "Coastal Gear Rentals",
      gear: "Surfboard - Beginner Level",
      rentalDate: "Feb 14 - Feb 17, 2024",
      status: "returned",
      disputed: false,
      totalAmount: 105,
    },
  ];

  // Filter gear
  let filteredGear = gearListings.filter((gear) => {
    const matchesSearch =
      gear.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gear.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      gearStatusFilter === "all" || gear.status === gearStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter orders
  let filteredOrders = rentalOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.gear.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      orderStatusFilter === "all" || order.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const getGearStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "flagged":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "removed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "returned":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "disputed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Content Moderation
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Review and manage platform content
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("gear")}
          className={`pb-4 px-4 text-sm font-medium transition-colors ${
            activeTab === "gear"
              ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Gear Listings
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-4 px-4 text-sm font-medium transition-colors ${
            activeTab === "orders"
              ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Rental Orders
        </button>
      </div>

      {/* Search and Filters */}
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder={
                  activeTab === "gear"
                    ? "Search gear listings..."
                    : "Search orders..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 bg-white py-2 pl-10 pr-4 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          {activeTab === "gear" && (
            <select
              value={gearStatusFilter}
              onChange={(e) => setGearStatusFilter(e.target.value as any)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="flagged">Flagged</option>
              <option value="removed">Removed</option>
            </select>
          )}

          {activeTab === "orders" && (
            <select
              value={orderStatusFilter}
              onChange={(e) => setOrderStatusFilter(e.target.value as any)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="returned">Returned</option>
              <option value="disputed">Disputed</option>
            </select>
          )}
        </div>
      </div>

      {/* Gear Listings Tab */}
      {activeTab === "gear" && (
        <div className="overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-800">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Gear Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Provider
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Price/Day
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Flags
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Posted
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredGear.map((gear) => (
                <tr
                  key={gear.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {gear.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {gear.category}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {gear.provider}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    ${gear.price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${getGearStatusColor(gear.status)}`}
                    >
                      {gear.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {gear.flags > 0 && (
                        <>
                          <Flag
                            size={16}
                            className="text-red-600 dark:text-red-400"
                          />
                          <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                            {gear.flags}
                          </span>
                        </>
                      )}
                      {gear.flags === 0 && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          -
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {gear.postedDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedGear(gear);
                          setIsGearModalOpen(true);
                        }}
                        className="rounded px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700"
                      >
                        <Eye size={16} className="inline" /> View
                      </button>
                      {gear.status !== "removed" && (
                        <button className="rounded px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700">
                          <Trash2 size={16} className="inline" /> Remove
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rental Orders Tab */}
      {activeTab === "orders" && (
        <div className="overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-800">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Gear
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Rental Period
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {order.customer}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {order.provider}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {order.gear}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {order.rentalDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${getOrderStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                      {order.disputed && (
                        <AlertTriangle
                          size={18}
                          className="text-red-600 dark:text-red-400"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    ${order.totalAmount}
                  </td>
                  <td className="px-6 py-4">
                    {order.disputed && (
                      <button className="rounded px-3 py-1 text-sm font-medium text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-gray-700">
                        <AlertTriangle size={16} className="inline" /> Review
                      </button>
                    )}
                    {!order.disputed && (
                      <button className="rounded px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700">
                        <Eye size={16} className="inline" /> View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Gear Details Modal */}
      {isGearModalOpen && selectedGear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Gear Listing Details
              </h2>
              <button
                onClick={() => setIsGearModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                    Name
                  </label>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedGear.name}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                    Provider
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedGear.provider}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                    Category
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedGear.category}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                    Price per Day
                  </label>
                  <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                    ${selectedGear.price}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                    Status
                  </label>
                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold capitalize ${getGearStatusColor(selectedGear.status)}`}
                  >
                    {selectedGear.status}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                    User Flags
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    {selectedGear.flags > 0 ? (
                      <>
                        <Flag
                          size={20}
                          className="text-red-600 dark:text-red-400"
                        />
                        <span className="text-lg font-bold text-red-600 dark:text-red-400">
                          {selectedGear.flags} flags
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        No flags
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                    Posted Date
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedGear.postedDate}
                  </p>
                </div>

                {selectedGear.flags > 5 && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20">
                    <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                      ⚠️ High flag count - Consider review or removal
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
              <button
                onClick={() => setIsGearModalOpen(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Close
              </button>
              <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Approve
              </button>
              <button className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
