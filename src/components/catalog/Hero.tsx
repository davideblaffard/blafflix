"use client";

import { Movie } from "@/types/movie";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useMyListStore } from "@/store/useMyListStore";

interface HeroProps {
  movie: Movie;
}

export function Hero({ movie }: HeroProps) {
  const router = useRouter();
  const { add, remove, isInList } = useMyListStore();
  const inList = isInList(movie.id);

  const handleToggleList = () => {
    if (inList) {
      remove(movie.id);
    } else {
      add(movie);
    }
  };

  return (
    <section className="relative mb-8 overflow-hidden rounded-b-2xl bg-black/60">
      <div className="relative h-[60vh] w-full max-h-[620px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-center px-4 pb-10 pt-24 md:px-12">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-semibold uppercase text-blafflix-red">
              Originale Blafflix
            </p>
            <h1 className="text-3xl font-black md:text-5xl">
              {movie.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-neutral-200">
              <span className="font-semibold text-green-400">
                {Math.round(movie.rating * 10)}% di match
              </span>
              <span>{movie.year}</span>
              <span className="rounded border border-neutral-400 px-1 text-xs">
                16+
              </span>
              {movie.type === "movie" && movie.durationMinutes && (
                <span>{movie.durationMinutes} min</span>
              )}
              {movie.type === "series" && movie.seasons && (
                <span>{movie.seasons} stagioni</span>
              )}
            </div>
            <p className="max-w-lg text-sm text-neutral-200 md:text-base">
              {movie.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => router.push(`/title/${movie.id}`)}
              >
                Guarda ora
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push(`/title/${movie.id}`)}
              >
                Dettagli
              </Button>
              <Button
                variant="secondary"
                onClick={handleToggleList}
              >
                {inList ? "Rimuovi dalla lista" : "Aggiungi alla lista"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
