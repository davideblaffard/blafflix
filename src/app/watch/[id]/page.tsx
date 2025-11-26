import { notFound } from "next/navigation";
import { getMovieById } from "@/lib/movies";
import { Movie } from "@/types/movie";
import { FakePlayer } from "@/components/player/FakePlayer";

type WatchParams = { id: string };

interface WatchPageProps {
  params: Promise<WatchParams>;
}

export default async function WatchPage(props: WatchPageProps) {
  // ⬇️ Next 16: params è una Promise, quindi va awaitato
  const { id } = await props.params;

  let movie: Movie | null = null;

  try {
    movie = await getMovieById(id);
  } catch (error) {
    console.error("Errore nel recupero del contenuto per il player:", error);
    movie = null;
  }

  if (!movie) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <FakePlayer movie={movie} />
    </div>
  );
}
