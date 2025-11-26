"use client";

import { Movie } from "@/types/movie";
import { useRouter } from "next/navigation";
import { useMyListStore } from "@/store/useMyListStore";
import { clsx } from "clsx";
import { useState } from "react";

interface HeroProps {
  movie: Movie;
}

export function Hero({ movie }: HeroProps) {
  const router = useRouter();
  const { add, remove, isInList } = useMyListStore();
  const inList = isInList(movie.id);
  const [hovered, setHovered] = useState(false);

  const handleToggleList = () => {
    if (inList) {
      remove(movie.id);
    } else {
      add(movie);
    }
  };

  return (
    <section
      className="relative mb-6 h-[55vh] w-full overflow-hidden bg-black"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0">
        <div
          className={clsx(
            "h-full w-full bg-cover bg-center transition-transform duration-500 ease-out",
            hovered ? "scale-105" : "scale-100"
          )}
          style={{ backgroundImage: `url(${movie.backdropUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-10 md:px-12">
        <p className="mb-2 text-xs font-semibold uppercase text-blafflix-red tracking-wide">
          In evidenza
        </p>
        <h1 className="max-w-xl text-3xl font-bold drop-shadow md:text-4xl lg:text-5xl">
          {movie.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-200">
          <span className="font-semibold text-green-400">
            {Math.round(movie.rating * 10)}% di match
          </span>
          <span>{movie.year}</span>
          <span className="rounded border border-neutral-400 px-1 text-xs">
            16+
          </span>
          <span className="text-xs uppercase text-neutral-400">
            {movie.type === "movie" ? "Film" : "Serie"}
          </span>
        </div>

        <p className="mt-3 max-w-xl text-sm text-neutral-200 line-clamp-3">
          {movie.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={() => router.push(`/title/${movie.id}`)}
            className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2 text-sm font-semibold text-black shadow-md transition-transform duration-200 hover:scale-105"
          >
            ▶ Guarda ora
          </button>
          <button
            onClick={handleToggleList}
            className="inline-flex items-center gap-2 rounded-md bg-neutral-600/80 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-neutral-500/90"
          >
            {inList ? "Rimuovi dalla lista" : "+ La mia lista"}
          </button>
        </div>
      </div>
    </section>
  );
}
