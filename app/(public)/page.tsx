import { Suspense } from "react";
import { getGears } from "./_actions/getGear";
import GearList from "./_components/gear/gearList";
import GearListSkeleton from "./_components/gear/gear-skeleton";

const Home = async () => {
  const gears = await getGears({});
  return (
    <Suspense fallback={<GearListSkeleton />}>
      <GearList gears={gears?.data} />
    </Suspense>
  );
};

export default Home;
