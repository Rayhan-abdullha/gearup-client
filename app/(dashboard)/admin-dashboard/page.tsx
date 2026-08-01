"use client";

import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

interface StatCard {
  label: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color: string;
}

interface ActivityItem {
  id: string;
  type: "user" | "gear" | "order";
  message: string;
  timestamp: string;
  severity: "info" | "warning" | "error";
}

export default function AdminDashboardPage() {
  const stats: StatCard[] = [
    {
      label: "Total Users",
      value: 1247,
      change: "+145 this month",
      icon: <Users size={24} />,
      color: "bg-blue-600",
    },
    {
      label: "Active Gear Listings",
      value: 3421,
      change: "+230 this month",
      icon: <Package size={24} />,
      color: "bg-green-600",
    },
    {
      label: "Total Active Rentals",
      value: 892,
      change: "On track",
      icon: <ShoppingCart size={24} />,
      color: "bg-purple-600",
    },
    {
      label: "Platform Revenue",
      value: "$45,230",
      change: "+18% from last month",
      icon: <TrendingUp size={24} />,
      color: "bg-amber-600",
    },
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: "1",
      type: "user",
      message: 'New provider registered: "Alpine Sports"',
      timestamp: "2 hours ago",
      severity: "info",
    },
    {
      id: "2",
      type: "gear",
      message: "Suspicious listing flagged by system: High-end camera rental",
      timestamp: "4 hours ago",
      severity: "warning",
    },
    {
      id: "3",
      type: "order",
      message: "Payment dispute reported on order ORD-24892",
      timestamp: "6 hours ago",
      severity: "error",
    },
    {
      id: "4",
      type: "user",
      message: "User account suspended: Multiple policy violations",
      timestamp: "8 hours ago",
      severity: "warning",
    },
    {
      id: "5",
      type: "gear",
      message: "New high-rated provider joined platform",
      timestamp: "12 hours ago",
      severity: "info",
    },
  ];

  const topProviders = [
    {
      name: "Alpine Sports Hub",
      listings: 287,
      revenue: "$12,450",
      rating: 4.8,
    },
    { name: "Urban Adventure", listings: 156, revenue: "$8,920", rating: 4.6 },
    {
      name: "Coastal Gear Rentals",
      listings: 142,
      revenue: "$7,680",
      rating: 4.7,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Platform health overview and key metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
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
              <div className={`${stat.color} rounded-lg p-3 text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <Link
              href="/dashboard/admin-dashboard/moderation"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 border-b border-gray-200 pb-4 last:border-0 dark:border-gray-700"
              >
                <div className="flex-shrink-0">
                  {activity.severity === "error" && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                      <AlertTriangle
                        size={18}
                        className="text-red-600 dark:text-red-300"
                      />
                    </div>
                  )}
                  {activity.severity === "warning" && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                      <AlertTriangle
                        size={18}
                        className="text-yellow-600 dark:text-yellow-300"
                      />
                    </div>
                  )}
                  {activity.severity === "info" && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <CheckCircle
                        size={18}
                        className="text-blue-600 dark:text-blue-300"
                      />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.message}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Providers */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Top Providers
            </h2>
            <Link
              href="/dashboard/admin-dashboard/users"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {topProviders.map((provider, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between border-b border-gray-200 pb-4 last:border-0 dark:border-gray-700"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {provider.name}
                  </p>
                  <div className="mt-1 space-y-1">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {provider.listings} listings
                    </p>
                    <p className="text-xs font-semibold text-green-600 dark:text-green-400">
                      {provider.revenue}
                    </p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1">
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">
                    {provider.rating}
                  </span>
                  <span className="text-yellow-500">★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
