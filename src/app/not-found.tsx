import { MainLayout } from "@/components/layout/MainLayout";

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">404 – Non trovato</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Il contenuto che cerchi non esiste (ancora) su Blafflix.
        </p>
      </div>
    </MainLayout>
  );
}
