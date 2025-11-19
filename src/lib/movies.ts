import { Movie } from "@/types/movie";

export const movies: Movie[] = [
  {
    id: "1",
    title: "Blafflix Originals: The Code Awakens",
    type: "series",
    genre: ["Sci-Fi", "Drama"],
    year: 2024,
    rating: 8.7,
    seasons: 2,
    posterUrl: "https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "In un futuro dominato da IA ribelli, un giovane developer scopre di poter modificare la realtà editando il codice sorgente dell'universo.",
    isTrending: true,
    isOriginal: true
  },
  {
    id: "2",
    title: "Dark Mode",
    type: "movie",
    genre: ["Thriller", "Tech"],
    year: 2023,
    rating: 7.9,
    durationMinutes: 116,
    posterUrl: "https://images.pexels.com/photos/3746311/pexels-photo-3746311.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/3746311/pexels-photo-3746311.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Un designer ossessionato dalla UX perfetta scopre un bug che rende letale il suo nuovo tema scuro.",
    isTrending: true,
    isTopRated: true
  },
  {
    id: "3",
    title: "Commit History",
    type: "series",
    genre: ["Comedy"],
    year: 2022,
    rating: 8.2,
    seasons: 3,
    posterUrl: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "La vita (e i bug) quotidiani di un team di sviluppo remoto che comunica solo tramite commit e meme.",
    isOriginal: true
  },
  {
    id: "4",
    title: "Frontend Wars",
    type: "movie",
    genre: ["Action", "Comedy"],
    year: 2021,
    rating: 7.4,
    durationMinutes: 104,
    posterUrl: "https://images.pexels.com/photos/2763108/pexels-photo-2763108.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/2763108/pexels-photo-2763108.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Framework contro framework in una guerra senza esclusione di colpi per il dominio del DOM.",
    isTopRated: true
  },
  {
    id: "5",
    title: "Refactor",
    type: "movie",
    genre: ["Drama"],
    year: 2020,
    rating: 8.1,
    durationMinutes: 98,
    posterUrl: "https://images.pexels.com/photos/1181670/pexels-photo-1181670.jpeg?auto=compress&cs=tinysrgb&w=400",
    backdropUrl: "https://images.pexels.com/photos/1181670/pexels-photo-1181670.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "Un senior developer torna sul suo legacy code di 10 anni prima per salvarlo dal disastro.",
    isTrending: false
  }
];

export const getMovieById = (id: string): Movie | undefined =>
  movies.find((m) => m.id === id);

export const getSimilarMovies = (movie: Movie): Movie[] =>
  movies.filter(
    (m) =>
      m.id !== movie.id && m.genre.some((g) => movie.genre.includes(g))
  );

export const getTrendingMovies = (): Movie[] =>
  movies.filter((m) => m.isTrending);

export const getTopRatedMovies = (): Movie[] =>
  movies.filter((m) => m.isTopRated);

export const getOriginals = (): Movie[] =>
  movies.filter((m) => m.isOriginal);

export const searchMovies = (query: string): Movie[] => {
  const q = query.toLowerCase();
  return movies.filter((m) => m.title.toLowerCase().includes(q));
};
