import Link from "next/link";
import { getStatusColor, getStatusLabel } from "../../_config/getConfig";

export interface RecentOrder {
  id: string;
  customerId: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  customer: {
    id: string;
    name: string;
  };
}

export function RecentOrdersTable({ orders }: { orders: RecentOrder[] }) {
  return (
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
                Amount
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
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white uppercase">
                    {order.id.replace("ord_", "ORD-")}
                  </td>
                  <td className="capitalize px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {order.customer?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    ${order.totalAmount}
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
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No recent orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
        <Link
          href="/provider-dashboard/orders"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all orders →
        </Link>
      </div>
    </div>
  );
}
