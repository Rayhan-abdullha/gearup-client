import { Suspense } from "react";
import { getGears } from "./_actions/getGear";
import GearList from "./_components/gear/gearList";
import GearListSkeleton from "./_components/gear/gear-skeleton";
import { getCategory } from "./_actions/getCategory";

const Home = async () => {
  const gears = await getGears({});
  const categories = await getCategory();
  return (
    <Suspense fallback={<GearListSkeleton />}>
      <GearList gears={gears?.data} categories={categories?.data} />
    </Suspense>
  );
};

export default Home;
