"use client";

import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useSearchStore } from "@/store/useSearchStore";
import { searchMovies } from "@/lib/movies";
import { Movie } from "@/types/movie";
import { EmptyState } from "@/components/states/EmptyState";
import { TitleCard } from "@/components/catalog/TitleCard";
import { Spinner } from "@/components/ui/Spinner";
import { TitleCardSkeleton } from "@/components/skeleton/TitleCardSkeleton";

export default function SearchPage() {
  const { query } = useSearchStore();
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    let ignore = false;

    setLoading(true);
    setError(null);

    // Debounce: attendiamo 400ms dopo l'ultimo cambio di query
    const handle = setTimeout(() => {
      searchMovies(query)
        .then((movies) => {
          if (ignore) return;
          setResults(movies);
        })
        .catch(() => {
          if (ignore) return;
          setError("Si è verificato un errore durante la ricerca.");
        })
        .finally(() => {
          if (ignore) return;
          setLoading(false);
        });
    }, 400);

    return () => {
      ignore = true;
      clearTimeout(handle);
    };
  }, [query]);

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

        {query && loading && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 text-neutral-300">
              <Spinner />
              <span className="text-sm">
                Cerco "{query}" su Blafflix...
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <TitleCardSkeleton key={idx} />
              ))}
            </div>
          </div>
        )}

        {query && !loading && error && (
          <EmptyState
            title="Errore durante la ricerca"
            description={error}
          />
        )}

        {query && !loading && !error && results.length === 0 && (
          <EmptyState
            title={`Nessun risultato per "${query}"`}
            description="Prova con un titolo diverso."
          />
        )}

        {results.length > 0 && !loading && !error && (
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
