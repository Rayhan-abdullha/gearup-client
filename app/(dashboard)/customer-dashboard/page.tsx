import { TrendingUp, Clock, CheckCircle2, DollarSign } from "lucide-react";
import RecentRental from "../_components/customer/recent-rental";
import StatCard from "../_components/customer/state-card";

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
      <RecentRental />
    </div>
  );
}
