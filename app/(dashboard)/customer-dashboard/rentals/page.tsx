import { Suspense } from "react";
import { getOrdersMe } from "../../_actions/getOrderMe";
import RentalHistory from "../../_components/customer/rental-history";
import RenatalHistorySkeleton from "../../_components/customer/rental-history-skeleton";

export default async function RentalHistoryPage() {
  const res = await getOrdersMe();
  return (
    <Suspense fallback={<RenatalHistorySkeleton />}>
      <RentalHistory rentals={res?.data?.rentals ?? []} />;
    </Suspense>
  );
}
