import axios from "axios";

export const discoverMovie = (search: string) => axios.get("/movie/discover", { params: { sort_by: "popularity.desc", size: 10, search } })
export const fetchMovieDetail = (movieId: string) => axios.get(`/movie/${movieId}`)
export const fetchMovieReviews = (movieId: string) => axios.get(`/movie/${movieId}/reviews`)
export const searchFirstFiveMovies = (search: string) => axios.get("/movie/discover", { params: { sort_by: "popularity.desc", size: 5, search } })