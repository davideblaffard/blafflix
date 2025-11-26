import { notFound } from "next/navigation";
import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { getMovieById, getSimilarMovies } from "@/lib/movies";
import { Movie } from "@/types/movie";
import { TitleCard } from "@/components/catalog/TitleCard";
import type { Metadata } from "next";

type TitleParams = { id: string };

export async function generateMetadata(
  props: { params: Promise<TitleParams> }
): Promise<Metadata> {
  const { id } = await props.params;

  try {
    const movie = await getMovieById(id);
    if (!movie) {
      return {
        title: "Contenuto non trovato – Blafflix"
      };
    }

    return {
      title: `${movie.title} – Blafflix`,
      description: movie.description
    };
  } catch {
    return {
      title: "Contenuto non disponibile – Blafflix"
    };
  }
}

export default async function TitlePage(
  props: { params: Promise<TitleParams> }
) {
  const { id } = await props.params;
  const movie = await getMovieById(id);

  if (!movie) {
    return notFound();
  }

  let similar: Movie[] = [];

  try {
    similar = await getSimilarMovies(movie);
  } catch (error) {
    console.error("Errore nel recupero dei contenuti simili:", error);
  }

  return (
    <MainLayout>
      <div className="relative mb-6">
        <div
          className="h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdropUrl})` }}
        >
          <div className="h-full w-full bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-6 md:px-12">
          <h1 className="text-3xl font-bold md:text-4xl">
            {movie.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-200">
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
            <span className="text-xs uppercase text-neutral-400">
              {movie.type === "movie" ? "Film" : "Serie"}
            </span>
          </div>

          {/* Bottoni azione stile Netflix */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/watch/${movie.id}`}
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2 text-sm font-semibold text-black shadow-md transition-transform duration-200 hover:scale-105"
            >
              ▶ Guarda ora
            </Link>

            <Link
              href="/my-list"
              className="inline-flex items-center gap-2 rounded-md bg-neutral-600/80 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-neutral-500/90"
            >
              La mia lista
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 md:px-12">
        <div className="mb-6 space-y-4 md:w-2/3">
          <p className="text-sm text-neutral-200 md:text-base">
            {movie.description}
          </p>
          {movie.genre.length > 0 && (
            <p className="text-xs text-neutral-400">
              Generi: {movie.genre.join(", ")}
            </p>
          )}
        </div>

        {similar.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">
              Contenuti simili
            </h2>
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
              {similar.map((m) => (
                <TitleCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
}
