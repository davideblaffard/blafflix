import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSkeleton } from "@/components/skeleton/HeroSkeleton";
import { RowSkeleton } from "@/components/skeleton/RowSkeleton";

export default function HomeLoading() {
  return (
    <MainLayout>
      <HeroSkeleton />
      <div className="space-y-4 pb-12 px-4 md:px-12">
        <RowSkeleton title="In evidenza per te" />
        <RowSkeleton title="Blafflix Originals" />
        <RowSkeleton title="Più votati" />
      </div>
    </MainLayout>
  );
}
