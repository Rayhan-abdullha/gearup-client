import { Suspense } from "react";
import { getAllGears } from "../../_actions/getAllGears";
import { getAllRentalsOrders } from "../../_actions/getAllRentOrder";
import ContentManagementPage from "../../_components/admin/content-management";
import ContentManagementSkeleton from "../../_components/admin/content-management-skeleton";
export default async function Page() {
  const [gearsRes, rentalsRes] = await Promise.all([
    getAllGears(),
    getAllRentalsOrders(),
  ]);

  return (
    <Suspense fallback={<ContentManagementSkeleton />}>
      <ContentManagementPage
        initialGears={gearsRes.data || []}
        initialRentals={rentalsRes.data || []}
      />
    </Suspense>
  );
}
