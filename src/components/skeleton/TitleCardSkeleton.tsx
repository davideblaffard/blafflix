export function TitleCardSkeleton() {
  return (
    <div className="relative h-40 min-w-[150px] overflow-hidden rounded-md bg-neutral-900">
      <div className="h-full w-full animate-pulse bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-800" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="mb-2 h-3 w-24 rounded bg-neutral-900/80" />
        <div className="flex gap-2">
          <div className="h-2 w-10 rounded bg-neutral-900/70" />
          <div className="h-2 w-10 rounded bg-neutral-900/70" />
        </div>
      </div>
    </div>
  );
}
