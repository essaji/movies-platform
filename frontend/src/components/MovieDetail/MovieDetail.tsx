import React from "react"
import Background from "../Background/Background"
import "./movie-detail.scss"
import { useQuery } from "react-query";
import { fetchMovieDetail } from "../../services/services"
import { useParams } from "react-router-dom"
import { Rate, Tag } from "antd";
import { Movie } from "../../types";
import { getDateMonthAndYear } from "../../utils/utils";
import MovieReviews from "../MovieReviews/MovieReviews";

export default function MovieDetail() {
  const { movieId } = useParams<{ movieId: string }>();
  const {
    isLoading,
    data
  } = useQuery<any>(movieId!!, () => fetchMovieDetail(movieId!!), { staleTime: Infinity })
  if (isLoading) return <div className="loader" />

  const movie:Movie = data.data
  return (
    <Background topMovieThumbnail={movie.backdropPath}>
      <div className="movie-detail">
        <div className="movie-detail__container">
          <div className="movie-detail__poster">
            <img src={movie.posterPath} alt="poster" />
          </div>
          <div className="movie-detail__overview-container">
            <div className="movie-detail__title">{movie.title}</div>
            <div className="movie-detail__release-date">Release Date: {getDateMonthAndYear(movie.releaseDate)}</div>
            <Rate allowHalf disabled defaultValue={movie.voteAverage} />
            <div className="movie-detail__votes-count">Total Votes: <b>{movie.voteCount.toLocaleString()}</b></div>
            <div className="movie-detail__genres" >
              {movie.genres.map(g => <Tag key={g.id} children={g.name} />)}
            </div>
            <div className="movie-detail__overview">{movie.overview}</div>
          </div>
        </div>
        <MovieReviews />
      </div>
    </Background>
  );
}