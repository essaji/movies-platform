import axios from "axios";

// axios.interceptors.request.use(config => {
//   config.url = `${window.location.origin}${config.url}`
//   return config
// })

export const discoverMovie = () => axios.get("/movie/discover", { params: { sort_by: "popularity.desc", size: 10 } })
export const fetchMovieDetail = (movieId: string) => axios.get(`/movie/${movieId}`)