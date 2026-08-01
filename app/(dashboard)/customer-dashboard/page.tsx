"use client";

import { TrendingUp, Clock, CheckCircle2, DollarSign } from "lucide-react";

const spendingData = [
  { month: "Jan", amount: 240 },
  { month: "Feb", amount: 380 },
  { month: "Mar", amount: 200 },
  { month: "Apr", amount: 520 },
  { month: "May", amount: 410 },
  { month: "Jun", amount: 650 },
];

const rentalStats = [
  { name: "Active Rentals", value: 2, color: "#3b82f6" },
  { name: "Completed", value: 12, color: "#10b981" },
  { name: "Cancelled", value: 1, color: "#ef4444" },
];

const recentRentals = [
  {
    id: "ORD-001",
    gear: "Mountain Bike Pro",
    status: "PICKED_UP",
    startDate: "2026-01-15",
    endDate: "2026-01-20",
    amount: 120,
  },
  {
    id: "ORD-002",
    gear: "Camping Tent 4P",
    status: "RETURNED",
    startDate: "2026-01-10",
    endDate: "2026-01-13",
    amount: 75,
  },
  {
    id: "ORD-003",
    gear: "Fishing Rod Set",
    status: "CONFIRMED",
    startDate: "2026-01-20",
    endDate: "2026-01-25",
    amount: 60,
  },
];

export default function CustomerDashboard() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Welcome back, Sarah!
      </h1>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Clock className="text-blue-600" size={24} />}
          label="Active Rentals"
          value="2"
          trend="Up 1 from last month"
        />
        <StatCard
          icon={<CheckCircle2 className="text-green-600" size={24} />}
          label="Completed Rentals"
          value="12"
          trend="100% satisfaction rate"
        />
        <StatCard
          icon={<DollarSign className="text-purple-600" size={24} />}
          label="Total Spent"
          value="$2,847"
          trend="This year"
        />
        <StatCard
          icon={<TrendingUp className="text-orange-600" size={24} />}
          label="Avg. Rental Duration"
          value="5.3 days"
          trend="Per rental"
        />
      </div>

      {/* Charts Section */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Spending Chart */}
        <div className="col-span-1 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 lg:col-span-2">
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
            Monthly Spending
          </h2>
          <div className="space-y-4">
            {spendingData.map((data) => (
              <div key={data.month}>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {data.month}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${data.amount}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                    style={{ width: `${(data.amount / 650) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rental Stats */}
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
            Rental Overview
          </h2>
          <div className="space-y-4">
            {rentalStats.map((stat) => (
              <div key={stat.name}>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(stat.value / 15) * 100}%`,
                      backgroundColor: stat.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Rentals */}
      <div className="rounded-lg bg-white shadow-md dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Recent Rentals
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Gear
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {recentRentals.map((rental) => (
                <tr
                  key={rental.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {rental.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {rental.gear}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {rental.startDate} to {rental.endDate}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <StatusBadge status={rental.status} />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    ${rental.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}

function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            {trend}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">{icon}</div>
      </div>
    </div>
  );
}

interface StatusBadgeProps {
  status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig: Record<
    string,
    { bg: string; text: string; label: string }
  > = {
    PLACED: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "Awaiting Confirmation",
    },
    CONFIRMED: { bg: "bg-blue-100", text: "text-blue-800", label: "Confirmed" },
    PAID: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      label: "Payment Received",
    },
    PICKED_UP: {
      bg: "bg-green-100",
      text: "text-green-800",
      label: "Picked Up",
    },
    RETURNED: { bg: "bg-gray-100", text: "text-gray-800", label: "Returned" },
    CANCELLED: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
  };

  const config = statusConfig[status] || statusConfig.PLACED;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
