import { StatCard } from "@/lib/types";
import { TrendingUp, Package, ShoppingCart, AlertCircle } from "lucide-react";

interface OverviewData {
  totalGearListed: number;
  activeRentals: number;
  pendingOrders: number;
  revenue: {
    _sum: {
      totalAmount: number | null;
    };
  };
}

export function ProviderStatsGrid({ data }: { data: OverviewData }) {
  const formattedRevenue = (
    data.revenue?._sum.totalAmount || 0
  ).toLocaleString();

  const stats: StatCard[] = [
    {
      label: "Total Gear Listed",
      value: data.totalGearListed,
      change: "Active listings",
      icon: <Package size={24} />,
      color: "bg-blue-600",
    },
    {
      label: "Active Rentals",
      value: data.activeRentals ?? 0,
      change: "Currently rented out",
      icon: <ShoppingCart size={24} />,
      color: "bg-green-600",
    },
    {
      label: "Pending Orders",
      value: data.pendingOrders ?? 0,
      change: "Awaiting fulfillment",
      icon: <AlertCircle size={24} />,
      color: "bg-orange-600",
    },
    {
      label: "Revenue (This Month)",
      value: `$${formattedRevenue}`,
      change: "Gross total volume",
      icon: <TrendingUp size={24} />,
      color: "bg-purple-600",
    },
  ];

  return (
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
  );
}
