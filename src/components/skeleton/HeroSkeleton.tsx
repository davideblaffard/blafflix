export function HeroSkeleton() {
  return (
    <section className="relative mb-6 h-[55vh] w-full overflow-hidden bg-gradient-to-b from-neutral-800 to-black">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800" />
      <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-10 md:px-12">
        <div className="mb-3 h-6 w-40 rounded bg-neutral-900/80" />
        <div className="mb-2 h-8 w-64 rounded bg-neutral-900/90" />
        <div className="mb-4 h-4 w-80 max-w-md rounded bg-neutral-900/70" />
        <div className="flex gap-3">
          <div className="h-10 w-28 rounded-md bg-neutral-900/90" />
          <div className="h-10 w-28 rounded-md bg-neutral-900/80" />
        </div>
      </div>
    </section>
  );
}
