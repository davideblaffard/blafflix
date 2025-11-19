import { notFound } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { getMovieById, getSimilarMovies } from "@/lib/movies";
import { TitleCard } from "@/components/catalog/TitleCard";

interface TitlePageProps {
  params: { id: string };
}

export function generateMetadata({ params }: TitlePageProps) {
  const movie = getMovieById(params.id);
  if (!movie) return { title: "Contenuto non trovato – Blafflix" };
  return {
    title: `${movie.title} – Blafflix`,
    description: movie.description
  };
}

export default function TitlePage({ params }: TitlePageProps) {
  const movie = getMovieById(params.id);
  if (!movie) return notFound();

  const similar = getSimilarMovies(movie);

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
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 md:px-12">
        <div className="mb-6 space-y-4 md:w-2/3">
          <p className="text-sm text-neutral-200 md:text-base">
            {movie.description}
          </p>
          <p className="text-xs text-neutral-400">
            Generi: {movie.genre.join(", ")}
          </p>
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
