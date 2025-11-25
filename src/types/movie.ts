export type MovieType = "movie" | "series";

export interface Movie {
  /**
   * Identificatore interno.
   * Dopo l'integrazione con TMDB il formato è:
   *   "<mediaType>-<tmdbId>"
   * Esempio: "movie-603" oppure "tv-1399"
   */
  id: string;
  title: string;
  type: MovieType;
  genre: string[];
  year: number;
  rating: number;
  durationMinutes?: number;
  seasons?: number;
  posterUrl: string;
  backdropUrl: string;
  description: string;
  isTrending?: boolean;
  isTopRated?: boolean;
  isOriginal?: boolean;
}
