import { Movie } from "@/types/movie";
import {
  fetchTrending,
  fetchTopRated,
  fetchOriginals,
  fetchMovieById as fetchMovieByIdFromTmdb,
  fetchSimilarById,
  searchMoviesByQuery
} from "@/lib/tmdb";

/**
 * Ritorna i contenuti trending (film + serie) da TMDB.
 */
export async function getTrendingMovies(): Promise<Movie[]> {
  const movies = await fetchTrending();
  return movies.map((m) => ({ ...m, isTrending: true }));
}

/**
 * Ritorna i film top rated da TMDB.
 */
export async function getTopRatedMovies(): Promise<Movie[]> {
  const movies = await fetchTopRated();
  return movies.map((m) => ({ ...m, isTopRated: true }));
}

/**
 * Ritorna gli "originals" (serie Netflix) da TMDB.
 */
export async function getOriginals(): Promise<Movie[]> {
  const movies = await fetchOriginals();
  return movies.map((m) => ({ ...m, isOriginal: true }));
}

/**
 * Dettaglio contenuto a partire dall'id interno (composito).
 */
export async function getMovieById(id: string): Promise<Movie | null> {
  return fetchMovieByIdFromTmdb(id);
}

/**
 * Contenuti simili per la sezione "Contenuti simili".
 *
 * Usa l'endpoint /{movie|tv}/{id}/similar di TMDB
 * in base all'id composito del contenuto sorgente.
 */
export async function getSimilarMovies(movie: Movie): Promise<Movie[]> {
  try {
    return await fetchSimilarById(movie.id);
  } catch {
    // In caso di errore ritorniamo un array vuoto, così la UI può semplicemente
    // non mostrare la sezione "Contenuti simili" senza andare in crash.
    return [];
  }
}

/**
 * Ricerca: lato server → chiama TMDB direttamente.
 * Lato client → chiama l'API interna /api/search per non esporre la API key.
 */
export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];

  // Lato server (es: Server Components, route handlers)
  if (typeof window === "undefined") {
    return searchMoviesByQuery(query);
  }

  // Lato client: chiamiamo l'API route che a sua volta interroga TMDB.
  const res = await fetch(
    `/api/search?query=${encodeURIComponent(query)}`,
    { method: "GET" }
  );

  if (!res.ok) {
    throw new Error("Errore durante la ricerca su TMDB.");
  }

  const data = (await res.json()) as Movie[];
  return data;
}
