export type MovieType = "movie" | "series";

export interface Movie {
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
