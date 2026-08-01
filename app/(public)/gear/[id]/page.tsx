import { Suspense } from "react";
import GearDetailSkeleton from "../../_components/gear/gearDetailsSkeleton";
import { GearDetail } from "../../_components/gear/gearDetails";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GearDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<GearDetailSkeleton />}>
      <GearDetail id={id} />
    </Suspense>
  );
}
