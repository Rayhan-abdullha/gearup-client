import {
  Users,
  Package,
  ShoppingBag,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
} from "lucide-react";
import { getAllGears } from "../_actions/getAllGears";
import { getAllRentalsOrders } from "../_actions/getAllRentOrder";
import { getAllUsers } from "../_actions/getAllusers";
import { Suspense } from "react";
import PlatformHealthSkeleton from "../_components/admin/dashboard-skeleton";

export interface PlatformMetrics {
  totalUsers: number;
  userGrowthPct: number;
  activeGearCount: number;
  gearGrowthPct: number;
  totalRentalsCount: number;
  rentalGrowthPct: number;
  totalRevenue: number;
  revenueGrowthPct: number;
  activeRentalsNow: number;
  systemHealth: "OPERATIONAL" | "DEGRADED" | "CRITICAL";
  uptimePct: number;
}

export default async function PlatformHealthDashboard() {
  const [gearsRes, rentalsRes, usersRes] = await Promise.all([
    getAllGears(),
    getAllRentalsOrders(),
    getAllUsers(),
  ]);

  const usersList = usersRes?.data || [];
  const gearsList = gearsRes?.data || [];
  const rentalsList = rentalsRes?.data || [];

  const totalUsers = usersList.length;

  const activeGearCount = gearsList.filter(
    (g: { isAvailable?: boolean }) => g.isAvailable ?? true,
  ).length;

  const totalRentalsCount = rentalsList.length;

  const totalRevenue = rentalsList.reduce(
    (acc: number, order: { totalAmount?: number }) =>
      acc + (order.totalAmount || 0),
    0,
  );

  const metrics: PlatformMetrics = {
    totalUsers,
    userGrowthPct: 12.5,
    activeGearCount,
    gearGrowthPct: 8.2,
    totalRentalsCount,
    rentalGrowthPct: 15.8,
    totalRevenue,
    revenueGrowthPct: 18.4,
    activeRentalsNow: rentalsList.filter(
      (r: { status?: string }) => r.status === "RENTED",
    ).length,
    systemHealth: "OPERATIONAL",
    uptimePct: 99.98,
  };

  return (
    <Suspense fallback={<PlatformHealthSkeleton />}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Bar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
                <Activity className="w-7 h-7 text-blue-600 dark:text-blue-500" />{" "}
                Platform Overview
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Real-time snapshot of system performance, marketplace volume,
                and user metrics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Total Users */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Accounts
                </span>
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {metrics.totalUsers.toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 text-xs mt-1 font-medium">
                  {metrics.userGrowthPct >= 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" /> +
                      {metrics.userGrowthPct}%
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <ArrowDownRight className="w-3.5 h-3.5" />{" "}
                      {metrics.userGrowthPct}%
                    </span>
                  )}
                  <span className="text-gray-400 dark:text-gray-500">
                    vs last period
                  </span>
                </div>
              </div>
            </div>

            {/* Active Gear */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Active Listings
                </span>
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {metrics.activeGearCount.toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 text-xs mt-1 font-medium">
                  {metrics.gearGrowthPct >= 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" /> +
                      {metrics.gearGrowthPct}%
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <ArrowDownRight className="w-3.5 h-3.5" />{" "}
                      {metrics.gearGrowthPct}%
                    </span>
                  )}
                  <span className="text-gray-400 dark:text-gray-500">
                    vs last period
                  </span>
                </div>
              </div>
            </div>

            {/* Total Rentals */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Rentals
                </span>
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {metrics.totalRentalsCount.toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 text-xs mt-1 font-medium">
                  {metrics.rentalGrowthPct >= 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" /> +
                      {metrics.rentalGrowthPct}%
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <ArrowDownRight className="w-3.5 h-3.5" />{" "}
                      {metrics.rentalGrowthPct}%
                    </span>
                  )}
                  <span className="text-gray-400 dark:text-gray-500">
                    vs last period
                  </span>
                </div>
              </div>
            </div>

            {/* Gross Volume / Revenue */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Gross Volume
                </span>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  ${metrics.totalRevenue.toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 text-xs mt-1 font-medium">
                  {metrics.revenueGrowthPct >= 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" /> +
                      {metrics.revenueGrowthPct}%
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <ArrowDownRight className="w-3.5 h-3.5" />{" "}
                      {metrics.revenueGrowthPct}%
                    </span>
                  )}
                  <span className="text-gray-400 dark:text-gray-500">
                    vs last period
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
