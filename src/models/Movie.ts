export default class Movie {
  id: string;
  posterPath: string;
  backdropPath: string;
  title: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  overview: string;
  genres: string[];

  constructor(movie) {
    return {
      id: movie.id,
      posterPath: `movie/image${movie.poster_path}?size=w500`,
      backdropPath: `movie/image${movie.backdrop_path}?size=original`,
      title: movie.title,
      releaseDate: movie.release_date,
      voteAverage: (movie.vote_average / 10) * 5,
      voteCount: movie.vote_count,
      overview: movie.overview,
      genres: movie.genres,
    };
  }
}
