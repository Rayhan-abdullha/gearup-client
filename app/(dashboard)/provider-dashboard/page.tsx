"use client";

import Link from "next/link";
import { TrendingUp, Package, ShoppingCart, AlertCircle } from "lucide-react";

interface StatCard {
  label: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color: string;
}

export default function ProviderDashboardPage() {
  const stats: StatCard[] = [
    {
      label: "Total Gear Listed",
      value: 24,
      change: "+3 this month",
      icon: <Package size={24} />,
      color: "bg-blue-600",
    },
    {
      label: "Active Rentals",
      value: 12,
      change: "4 returning soon",
      icon: <ShoppingCart size={24} />,
      color: "bg-green-600",
    },
    {
      label: "Pending Orders",
      value: 5,
      change: "2 awaiting confirmation",
      icon: <AlertCircle size={24} />,
      color: "bg-orange-600",
    },
    {
      label: "Revenue (This Month)",
      value: "$2,450",
      change: "+12% from last month",
      icon: <TrendingUp size={24} />,
      color: "bg-purple-600",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      gear: "Mountain Bike",
      status: "pending",
      date: "2024-08-01",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      gear: "Ski Equipment Set",
      status: "confirmed",
      date: "2024-07-31",
    },
    {
      id: "ORD-003",
      customer: "Mike Chen",
      gear: "Camping Tent",
      status: "picked_up",
      date: "2024-07-30",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "picked_up":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    return (
      status.replace("_", " ").charAt(0).toUpperCase() +
      status.slice(1).replace("_", " ")
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Provider Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's your business overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                {stat.change && (
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {stat.change}
                  </p>
                )}
              </div>
              <div className={`rounded-lg ${stat.color} p-3 text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders and Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-lg bg-white shadow-sm dark:bg-gray-800">
          <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Recent Orders
            </h2>
          </div>
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {order.gear}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
            <Link
              href="/dashboard/provider-dashboard/orders"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all orders →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
          <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
          </div>
          <div className="space-y-3 p-6">
            <Link
              href="/provider-dashboard/inventory?action=add"
              className="block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Add New Gear
            </Link>
            <Link
              href="/provider-dashboard/orders"
              className="block rounded-lg border-2 border-blue-600 px-4 py-3 text-center font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              Manage Orders
            </Link>
            <Link
              href="/provider-dashboard/inventory"
              className="block rounded-lg border-2 border-gray-300 px-4 py-3 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              View Inventory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
