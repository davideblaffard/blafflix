import { MainLayout } from "@/components/layout/MainLayout";
import { Hero } from "@/components/catalog/Hero";
import { Row } from "@/components/catalog/Row";
import {
  getTrendingMovies,
  getTopRatedMovies,
  getOriginals
} from "@/lib/movies";
import { Movie } from "@/types/movie";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let trending: Movie[] = [];
  let topRated: Movie[] = [];
  let originals: Movie[] = [];
  let errorMessage: string | null = null;

  try {
    const [t, tr, o] = await Promise.all([
      getTrendingMovies(),
      getTopRatedMovies(),
      getOriginals()
    ]);

    trending = t;
    topRated = tr;
    originals = o;
  } catch (error) {
    console.error("Errore durante il fetch da TMDB:", error);
    errorMessage =
      "Non è stato possibile caricare i contenuti al momento. Riprova più tardi.";
  }

  const heroMovie: Movie | undefined =
    trending[0] ?? topRated[0] ?? originals[0];

  return (
    <MainLayout>
      {heroMovie && <Hero movie={heroMovie} />}

      <div className="space-y-4 pb-12">
        {errorMessage && (
          <div className="px-4 pt-4 text-sm text-red-400 md:px-12">
            {errorMessage}
          </div>
        )}

        {trending.length > 0 && (
          <Row title="In evidenza per te" movies={trending} />
        )}

        {originals.length > 0 && (
          <Row title="Blafflix Originals" movies={originals} />
        )}

        {topRated.length > 0 && (
          <Row title="Più votati" movies={topRated} />
        )}
      </div>
    </MainLayout>
  );
}
