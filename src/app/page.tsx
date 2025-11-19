import { MainLayout } from "@/components/layout/MainLayout";
import {
  getTrendingMovies,
  getTopRatedMovies,
  getOriginals,
  movies
} from "@/lib/movies";
import { Hero } from "@/components/catalog/Hero";
import { Row } from "@/components/catalog/Row";

export default function HomePage() {
  const trending = getTrendingMovies();
  const topRated = getTopRatedMovies();
  const originals = getOriginals();
  const heroMovie = trending[0] ?? movies[0];

  return (
    <MainLayout>
      <Hero movie={heroMovie} />
      <div className="space-y-4 pb-12">
        <Row title="In evidenza per te" movies={trending} />
        <Row title="Blafflix Originals" movies={originals} />
        <Row title="Più votati" movies={topRated} />
        <Row title="Tutti i contenuti" movies={movies} />
      </div>
    </MainLayout>
  );
}
