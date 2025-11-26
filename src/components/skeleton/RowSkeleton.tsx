import { TitleCardSkeleton } from "./TitleCardSkeleton";

interface RowSkeletonProps {
  title?: string;
  count?: number;
}

export function RowSkeleton({ title, count = 6 }: RowSkeletonProps) {
  return (
    <section className="space-y-2">
      {title && (
        <div className="h-5 w-32 rounded bg-neutral-800" aria-hidden="true" />
      )}
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
        {Array.from({ length: count }).map((_, idx) => (
          <TitleCardSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
}
