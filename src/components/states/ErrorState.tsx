"use client";

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({
  message = "Si è verificato un errore. Riprova più tardi."
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-red-400">
      <p className="text-lg font-semibold">Ops!</p>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
}
