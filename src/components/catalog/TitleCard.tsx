"use client";

import { Movie } from "@/types/movie";
import { useRouter } from "next/navigation";
import { useMyListStore } from "@/store/useMyListStore";
import { clsx } from "clsx";

interface TitleCardProps {
  movie: Movie;
}

export function TitleCard({ movie }: TitleCardProps) {
  const router = useRouter();
  const { add, remove, isInList } = useMyListStore();
  const inList = isInList(movie.id);

  const handleToggleList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inList) {
      remove(movie.id);
    } else {
      add(movie);
    }
  };

  return (
    <div
      className="group relative h-40 min-w-[150px] cursor-pointer overflow-hidden rounded-md bg-neutral-900/80 transition hover:scale-105 hover:z-10"
      onClick={() => router.push(`/title/${movie.id}`)}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="h-full w-full object-cover transition group-hover:opacity-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition group-hover:opacity-100">
        <h3 className="text-sm font-semibold">{movie.title}</h3>
        <div className="mt-1 flex items-center gap-2 text-[0.7rem] text-neutral-300">
          <span className="font-semibold text-green-400">
            {Math.round(movie.rating * 10)}% match
          </span>
          <span>{movie.year}</span>
          <span className="rounded border border-neutral-400 px-1">
            {movie.type === "movie" ? "Film" : "Serie"}
          </span>
        </div>
        <button
          onClick={handleToggleList}
          className={clsx(
            "pointer-events-auto mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition",
            inList
              ? "bg-white text-black"
              : "bg-blafflix-red text-white hover:bg-red-700"
          )}
        >
          {inList ? "Nella lista" : "+ La mia lista"}
        </button>
      </div>
    </div>
  );
}
