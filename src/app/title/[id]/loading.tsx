import { MainLayout } from "@/components/layout/MainLayout";
import { DetailPageSkeleton } from "@/components/skeleton/DetailPageSkeleton";

export default function TitleLoading() {
  return (
    <MainLayout>
      <DetailPageSkeleton />
    </MainLayout>
  );
}
