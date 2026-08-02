import { getOrdersMe } from "../../_actions/getOrderMe";
import RentalHistory from "../../_components/customer/rental-history";

export default async function RentalHistoryPage() {
  const res = await getOrdersMe();
  return <RentalHistory rentals={res?.data ?? []} />;
}
