import { TrendingUp, Clock, CheckCircle2, DollarSign } from "lucide-react";
import RecentRental from "../_components/customer/recent-rental";
import StatCard from "../_components/customer/state-card";
import { getOrdersMe } from "../_actions/getOrderMe";
import { Suspense } from "react";
import DashboardSkeleton from "../_components/customer/dashboard-skeletion";

export default async function CustomerDashboard() {
  const res = await getOrdersMe();
  const totalSpent = res?.data.totalSpent || 0;
  const activeRentals = res?.data.activeRentals || 0;
  const completedRentals = res?.data.completeRentals || 0;

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <div>
        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Clock className="text-blue-600" size={24} />}
            label="Active Rentals"
            value={activeRentals}
            trend="Up 1 from last month"
          />
          <StatCard
            icon={<CheckCircle2 className="text-green-600" size={24} />}
            label="Completed Rentals"
            value={completedRentals}
            trend="100% satisfaction rate"
          />
          <StatCard
            icon={<DollarSign className="text-purple-600" size={24} />}
            label="Total Spent"
            value={"$" + totalSpent}
            trend="This year"
          />
          <StatCard
            icon={<TrendingUp className="text-orange-600" size={24} />}
            label="Avg. Rental Duration"
            value="5.3 days"
            trend="Per rental"
          />
        </div>
        <RecentRental />
      </div>
    </Suspense>
  );
}
