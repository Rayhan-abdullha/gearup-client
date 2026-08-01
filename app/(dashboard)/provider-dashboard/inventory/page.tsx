import { getGears } from "@/app/(public)/_actions/getGear";
import InventoryClient from "../../_components/inventory-client";
import { getCategory } from "@/app/(public)/_actions/getCategory";

export default async function InventoryPage() {
  const gears = await getGears({});
  const categories = await getCategory();

  return (
    <div className="space-y-6">
      <InventoryClient
        initialGears={gears?.data}
        categories={categories?.data}
      />
    </div>
  );
}
