import React from 'react'
import { useNavigate } from "react-router-dom";
import { Col, Rate, Row } from "antd";
import { useQuery } from "react-query";

import Background from "../Background/Background";
import { discoverMovie } from "../../services/services";
import "./discover-movie.scss";
import { Movie } from "../../types";

export default function DiscoverMovie() {
  const navigate = useNavigate()
  const { isLoading, data: query } = useQuery<any>('page', discoverMovie, { staleTime: Infinity })
  if (isLoading) return <div className="loader" />
  return (
    <Background topMovieThumbnail={query.data[0]?.backdropPath}>
      <div className="discover-movie">
        <Row gutter={{ xs: 4, sm: 8, md: 16, lg: 24 }} justify="center" style={{ paddingTop: 24 }} >
          {query.data.map((movie: Movie) => {
            const releaseDate = new Date(movie.releaseDate)
            const releaseMonth = releaseDate.toLocaleString('default', { month: 'long' })
            const releaseYear = releaseDate.getFullYear()
            return (
              <Col className="gutter-row" key={movie.id} style={{ paddingBottom: 24 }}>
                <div className="discover-movie__movie-card" onClick={() => navigate(`/detail/${movie.id}`)}>
                  <img className="discover-movie__movie-thumbnail" src={movie.posterPath} alt="poster" />
                  <Rate allowHalf defaultValue={movie.voteAverage} />
                  <div className="discover-movie__movie-card-title">{movie.title}</div>
                  <div className="discover-movie__movie-card-date">{releaseMonth} {releaseYear}</div>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    </Background>
  )
}