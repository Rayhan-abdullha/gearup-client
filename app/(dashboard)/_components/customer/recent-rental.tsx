import { RentalOrder } from "@/lib/types";
import { getOrdersMe } from "../../_actions/getOrderMe";
import StatusBadge from "./state-badge";
const RecentRental = async () => {
  const res = await getOrdersMe();
  return (
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
            {res.data.map((rental: RentalOrder) => {
              const startDate = new Date(rental.items[0].startDate);
              const endDate = new Date(rental.items[0].endDate);

              const rentalDays = Math.ceil(
                (endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24),
              );

              const rentalDuration = `${rentalDays} days`;
              return (
                <tr
                  key={rental.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {rental.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {rental.items[0].gear.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {rentalDuration}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <StatusBadge status={rental.paymentStatus} />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    ${rental.totalAmount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentRental;
