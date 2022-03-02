export type Movie = {
  id: string;
  posterPath: string;
  backdropPath: string;
  title: string;
  releaseDate: string;
  voteAverage: number;
  overview: string;
  voteCount: number;
  genres: {id:string, name: string}[]
}