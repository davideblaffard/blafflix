"use client";

import { Movie } from "@/types/movie";
import { TitleCard } from "./TitleCard";

interface RowProps {
  title: string;
  movies: Movie[];
}

export function Row({ title, movies }: RowProps) {
  if (!movies.length) return null;

  return (
    <section className="mb-6 space-y-2">
      <h2 className="px-4 text-sm font-semibold text-neutral-200 md:px-12 md:text-base">
        {title}
      </h2>
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1 md:px-12">
        {movies.map((movie) => (
          <TitleCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
