"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useEffect } from "react";
import { useMyListStore } from "@/store/useMyListStore";
import { EmptyState } from "@/components/states/EmptyState";
import { TitleCard } from "@/components/catalog/TitleCard";

export default function MyListPage() {
  const { items, hydrate } = useMyListStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-12">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">
          La mia lista
        </h1>
        {!items.length ? (
          <EmptyState
            title="La tua lista è vuota"
            description="Aggiungi contenuti alla tua lista dalla home o dalla pagina dei dettagli."
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {items.map((movie) => (
              <TitleCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
