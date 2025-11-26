export function DetailPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative mb-6 h-[50vh] w-full overflow-hidden bg-neutral-900">
        <div className="h-full w-full bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-6 md:px-12">
          <div className="mb-3 h-3 w-24 rounded bg-neutral-900/80" />
          <div className="mb-2 h-7 w-64 rounded bg-neutral-900/90" />
          <div className="mb-2 h-3 w-40 rounded bg-neutral-900/80" />
          <div className="flex gap-3 pt-2">
            <div className="h-9 w-28 rounded-md bg-neutral-900/90" />
            <div className="h-9 w-28 rounded-md bg-neutral-900/80" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 md:px-12">
        <div className="mb-6 space-y-3 md:w-2/3">
          <div className="h-4 w-full rounded bg-neutral-900/80" />
          <div className="h-4 w-5/6 rounded bg-neutral-900/70" />
          <div className="h-3 w-1/3 rounded bg-neutral-900/70" />
        </div>

        <div className="space-y-2">
          <div className="h-5 w-40 rounded bg-neutral-900/80" />
          <div className="flex gap-3 overflow-x-auto pb-1">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-40 min-w-[150px] rounded-md bg-neutral-900"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
