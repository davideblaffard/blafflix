"use client";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-neutral-400">
      <p className="text-lg font-semibold text-neutral-100">{title}</p>
      {description && (
        <p className="mt-2 text-sm text-neutral-400">{description}</p>
      )}
    </div>
  );
}
