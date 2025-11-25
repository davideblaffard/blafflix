"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/states/ErrorState";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <ErrorState message="Qualcosa è andato storto." />

      <button
        onClick={reset}
        className="mt-6 px-4 py-2 bg-white text-black rounded"
      >
        Riprova
      </button>
    </div>
  );
}
