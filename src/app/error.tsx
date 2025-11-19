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
    <html>
      <body className="bg-black text-white">
        <div className="min-h-screen">
          <ErrorState message="Qualcosa è andato storto." />
          <div className="flex justify-center">
            <button
              onClick={reset}
              className="rounded bg-white px-4 py-2 text-sm text-black"
            >
              Riprova
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
