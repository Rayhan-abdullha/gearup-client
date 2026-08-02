import Link from "next/link";
import { getProviderOverview } from "../_actions/getProviderOverview";
import { ProviderStatsGrid } from "../_components/provider/state";
import { RecentOrdersTable } from "../_components/provider/recent-order-table";

export default async function ProviderDashboardPage() {
  const res = await getProviderOverview();

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

      {/* Dynamic Stats Component */}
      <ProviderStatsGrid data={res.data} />

      {/* Recent Orders and Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Dynamic Recent Orders Component */}
        <RecentOrdersTable orders={res.data.recentOrders || []} />

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
