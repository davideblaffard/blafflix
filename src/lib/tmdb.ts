import { Movie } from "@/types/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

type TmdbMediaType = "movie" | "tv";

interface TmdbGenre {
  id: number;
  name: string;
}

interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface TmdbMovieLike {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids?: number[];
  genres?: TmdbGenre[];
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: TmdbMediaType;
  original_language?: string;
}

interface TmdbMovieDetail extends TmdbMovieLike {
  runtime?: number | null;
}

interface TmdbTvDetail extends TmdbMovieLike {
  number_of_seasons?: number | null;
}

/**
 * Recupera la API key TMDB da process.env.
 * NON esposta al client.
 */
function getApiKey(): string {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error(
      "TMDB_API_KEY non è configurata. Aggiungi TMDB_API_KEY nel file `.env.local`."
    );
  }
  return apiKey;
}

async function tmdbFetch<T>(
  path: string,
  params: Record<string, string | number | boolean> = {}
): Promise<T> {
  const apiKey = getApiKey();
  const url = new URL(`${TMDB_BASE_URL}${path}`);

  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "it-IT");
  url.searchParams.set("include_adult", "false");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const res = await fetch(url.toString(), {
    // Solo lato server
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `TMDB request failed: ${res.status} ${res.statusText} – ${text}`
    );
  }

  return (await res.json()) as T;
}

async function getGenreMap(): Promise<Map<number, string>> {
  const [movieGenres, tvGenres] = await Promise.all([
    tmdbFetch<{ genres: TmdbGenre[] }>("/genre/movie/list"),
    tmdbFetch<{ genres: TmdbGenre[] }>("/genre/tv/list")
  ]);

  const map = new Map<number, string>();
  [...movieGenres.genres, ...tvGenres.genres].forEach((g) => {
    if (!map.has(g.id)) {
      map.set(g.id, g.name);
    }
  });

  return map;
}

function buildCompositeId(mediaType: TmdbMediaType, tmdbId: number): string {
  return `${mediaType}-${tmdbId}`;
}

function parseCompositeId(
  compositeId: string
): { mediaType: TmdbMediaType; tmdbId: number } {
  const [mediaTypeRaw, idRaw] = compositeId.split("-");
  const mediaType = mediaTypeRaw === "tv" ? "tv" : "movie";
  const tmdbId = Number(idRaw);
  if (!tmdbId || Number.isNaN(tmdbId)) {
    throw new Error(`ID TMDB non valido: ${compositeId}`);
  }
  return { mediaType, tmdbId };
}

/**
 * Converte un oggetto tipo TMDB in il nostro tipo Movie interno.
 */
function mapTmdbToMovie(
  item: TmdbMovieLike | TmdbMovieDetail | TmdbTvDetail,
  options: {
    mediaType?: TmdbMediaType;
    genreMap?: Map<number, string>;
  } = {}
): Movie {
  const mediaType: TmdbMediaType =
    options.mediaType ?? item.media_type ?? "movie";

  const title = item.title ?? item.name ?? "Senza titolo";

  const date = item.release_date ?? item.first_air_date ?? "0000-01-01";
  const year = Number(date.slice(0, 4)) || 0;

  let genres: string[] = [];
  if (item.genres && item.genres.length) {
    genres = item.genres.map((g) => g.name);
  } else if (item.genre_ids && options.genreMap) {
    genres = item.genre_ids
      .map((id) => options.genreMap!.get(id))
      .filter((g): g is string => Boolean(g));
  }

  const posterUrl = item.poster_path
    ? `${TMDB_IMAGE_BASE_URL}/w500${item.poster_path}`
    : "/placeholder-poster.jpg";

  const backdropUrl = item.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}/w1280${item.backdrop_path}`
    : posterUrl;

  const durationMinutes =
    (item as TmdbMovieDetail).runtime !== undefined
      ? (item as TmdbMovieDetail).runtime ?? undefined
      : undefined;

  const seasons =
    (item as TmdbTvDetail).number_of_seasons !== undefined
      ? (item as TmdbTvDetail).number_of_seasons ?? undefined
      : undefined;

  return {
    id: buildCompositeId(mediaType, item.id),
    title,
    type: mediaType === "movie" ? "movie" : "series",
    genre: genres,
    year,
    rating: item.vote_average ?? 0,
    durationMinutes: durationMinutes || undefined,
    seasons: seasons || undefined,
    posterUrl,
    backdropUrl,
    description: item.overview || "",
    // Questi flag possono essere impostati nei chiamanti dove serve
    isTrending: undefined,
    isTopRated: undefined,
    isOriginal: undefined
  };
}

/**
 * Contenuti trending (film + serie).
 */
export async function fetchTrending(): Promise<Movie[]> {
  const [data, genreMap] = await Promise.all([
    tmdbFetch<TmdbPaginatedResponse<TmdbMovieLike>>("/trending/all/week"),
    getGenreMap()
  ]);

  return data.results
    .filter((item) => item.media_type === "movie" || item.media_type === "tv")
    .map((item) =>
      mapTmdbToMovie(item, {
        mediaType: item.media_type ?? "movie",
        genreMap
      })
    );
}

/**
 * Film più votati.
 */
export async function fetchTopRated(): Promise<Movie[]> {
  const [data, genreMap] = await Promise.all([
    tmdbFetch<TmdbPaginatedResponse<TmdbMovieLike>>("/movie/top_rated"),
    getGenreMap()
  ]);

  return data.results.map((item) =>
    mapTmdbToMovie(
      { ...item, media_type: "movie" },
      { mediaType: "movie", genreMap }
    )
  );
}

/**
 * "Originals": serie TV Netflix (network 213).
 */
export async function fetchOriginals(): Promise<Movie[]> {
  const [data, genreMap] = await Promise.all([
    tmdbFetch<TmdbPaginatedResponse<TmdbMovieLike>>("/discover/tv", {
      with_networks: 213
    }),
    getGenreMap()
  ]);

  return data.results.map((item) =>
    mapTmdbToMovie(
      { ...item, media_type: "tv" },
      { mediaType: "tv", genreMap }
    )
  );
}

/**
 * Dettaglio contenuto (film o serie) dato il composite id "movie-123"/"tv-456".
 */
export async function fetchMovieById(compositeId: string): Promise<Movie | null> {
  const { mediaType, tmdbId } = parseCompositeId(compositeId);

  if (mediaType === "movie") {
    const data = await tmdbFetch<TmdbMovieDetail>(`/movie/${tmdbId}`);
    return mapTmdbToMovie(
      { ...data, media_type: "movie" },
      { mediaType: "movie" }
    );
  }

  const data = await tmdbFetch<TmdbTvDetail>(`/tv/${tmdbId}`);
  return mapTmdbToMovie(
    { ...data, media_type: "tv" },
    { mediaType: "tv" }
  );
}

/**
 * Contenuti simili basati sull'id TMDB e tipo.
 */
export async function fetchSimilarById(
  compositeId: string
): Promise<Movie[]> {
  const { mediaType, tmdbId } = parseCompositeId(compositeId);
  const [data, genreMap] = await Promise.all([
    tmdbFetch<TmdbPaginatedResponse<TmdbMovieLike>>(
      `/${mediaType}/${tmdbId}/similar`
    ),
    getGenreMap()
  ]);

  return data.results.map((item) =>
    mapTmdbToMovie(
      { ...item, media_type: mediaType },
      { mediaType, genreMap }
    )
  );
}

/**
 * Ricerca globale: film + serie che matchano la query.
 */
export async function searchMoviesByQuery(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];

  const [data, genreMap] = await Promise.all([
    tmdbFetch<TmdbPaginatedResponse<TmdbMovieLike>>("/search/multi", {
      query
    }),
    getGenreMap()
  ]);

  return data.results
    .filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    )
    .map((item) =>
      mapTmdbToMovie(item, {
        mediaType: item.media_type ?? "movie",
        genreMap
      })
    );
}
