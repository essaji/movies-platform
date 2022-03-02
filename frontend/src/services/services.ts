import axios from "axios";

// axios.interceptors.request.use(config => {
//   config.url = `${window.location.origin}${config.url}`
//   return config
// })

export const discoverMovie = (search: string) => axios.get("/movie/discover", { params: { sort_by: "popularity.desc", size: 10, search } })
export const fetchMovieDetail = (movieId: string) => axios.get(`/movie/${movieId}`)
export const fetchMovieReviews = (movieId: string) => axios.get(`/movie/${movieId}/reviews`)