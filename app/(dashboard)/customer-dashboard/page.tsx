import { getOrdersMe } from "../_actions/getOrderMe";
import { Suspense } from "react";
import DashboardSkeleton from "../_components/customer/dashboard-skeletion";
import CustomerDasboard from "../_components/customer/customer-dasboard";

export default async function CustomerDashboard() {
  const res = await getOrdersMe();

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <CustomerDasboard data={res?.data} />
    </Suspense>
  );
}
