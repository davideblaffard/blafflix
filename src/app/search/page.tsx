"use client";

import { useEffect, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useSearchStore } from "@/store/useSearchStore";
import { searchMovies } from "@/lib/movies";
import { EmptyState } from "@/components/states/EmptyState";
import { TitleCard } from "@/components/catalog/TitleCard";

export default function SearchPage() {
  const { query } = useSearchStore();

  const results = useMemo(() => {
    if (!query) return [];
    return searchMovies(query);
  }, [query]);

  useEffect(() => {
    // niente, ma potresti aggiungere tracking
  }, []);

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-12">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">
          Cerca
        </h1>
        {!query && (
          <EmptyState
            title="Inizia una ricerca"
            description="Scrivi qualcosa nella barra in alto per cercare tra i contenuti."
          />
        )}
        {query && !results.length && (
          <EmptyState
            title={`Nessun risultato per "${query}"`}
            description="Prova con un titolo diverso."
          />
        )}
        {results.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {results.map((movie) => (
              <TitleCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
