import { StatCard } from "@/lib/types";
import { TrendingUp, Package, ShoppingCart, AlertCircle } from "lucide-react";

export interface OrderItem {
  id: string;
  quantity: number;
  priceAtRent: number;
  startDate: string;
  endDate: string;
  gear: {
    id: string;
    title: string;
    brand: string;
    pricePerDay: number;
  };
}

export interface ProviderOrder {
  id: string;
  totalAmount: number;
  status:
    | "PLACED"
    | "CONFIRMED"
    | "PAID"
    | "PICKED_UP"
    | "RETURNED"
    | "CANCELLED";
  paymentStatus: "PAID" | "FAIED" | "PENDING" | "REFUNDED";
  customerId: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
}

export function ProviderStatsGrid({
  orders = [],
}: {
  orders: ProviderOrder[];
}) {
  // Calculate dynamic stats from orders array
  const activeRentals = orders.filter(
    (o) =>
      o.status === "PICKED_UP" ||
      o.status === "CONFIRMED" ||
      o.status === "PAID",
  ).length;

  const pendingOrders = orders.filter(
    (o) => o.status === "PLACED" || o.status === "CONFIRMED",
  ).length;

  const totalRevenue = orders.reduce((sum, order) => {
    return order.status !== "CANCELLED" ? sum + order.totalAmount : sum;
  }, 0);

  // Collect unique gear listed count across active orders
  const uniqueGears = new Set(
    orders.flatMap((o) => o.items.map((i) => i.gear?.id)).filter(Boolean),
  ).size;

  const stats: StatCard[] = [
    {
      label: "Total Gear Listed",
      value: uniqueGears || orders.length,
      change: "Active in orders",
      icon: <Package size={24} />,
      color: "bg-blue-600",
    },
    {
      label: "Active Rentals",
      value: activeRentals,
      change: "Currently out or active",
      icon: <ShoppingCart size={24} />,
      color: "bg-green-600",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      change: "Needs processing",
      icon: <AlertCircle size={24} />,
      color: "bg-orange-600",
    },
    {
      label: "Revenue (This Month)",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "Gross income",
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
