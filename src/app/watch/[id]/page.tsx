import { notFound } from "next/navigation";
import { getMovieById } from "@/lib/movies";
import { Movie } from "@/types/movie";
import { FakePlayer } from "@/components/player/FakePlayer";

interface WatchPageProps {
  params: { id: string };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const movie: Movie | null = await getMovieById(params.id);

  if (!movie) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <FakePlayer movie={movie} />
    </div>
  );
}
