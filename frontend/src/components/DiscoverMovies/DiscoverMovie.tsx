import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, Col, Rate, Row } from "antd";
import { useQuery } from "react-query";
import Search from "antd/lib/input/Search";

import Background from "../Background/Background";
import { discoverMovie } from "../../services/services";
import "./discover-movie.scss";
import { Movie } from "../../types";
import { getDateMonthAndYear } from "../../utils/utils";

export default function DiscoverMovie() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("query");
  const {
    isLoading,
    data: query
  } = useQuery<any>(`discover_movie_${searchText}`, () => discoverMovie(searchText!!), { staleTime: Infinity });
  if (isLoading) return <div className="loader" />;
  return (
    <Background topMovieThumbnail={query.data[0]?.backdropPath}>
      <div className="discover-movie__search">
        <Search placeholder="Type movie name..." onSearch={textToSearch => navigate(`?query=${textToSearch}`)}
                style={{ width: 250 }} />
      </div>
      <div className="discover-movie">
        <Row gutter={{ xs: 4, sm: 8, md: 16, lg: 24 }} justify="center" style={{ paddingTop: 24 }}>
          {query.data.map((movie: Movie) => {
            return (
              <Col className="gutter-row" key={movie.id} style={{ paddingBottom: 24 }}>
                <Card
                  hoverable
                  style={{ height: 450, width: 200, overflow: "hidden" }}
                  cover={<img className="discover-movie__movie-thumbnail" src={movie.posterPath} alt="poster" />}
                  onClick={() => navigate(`/detail/${movie.id}`)}
                >
                  <Rate allowHalf disabled defaultValue={movie.voteAverage} />
                  <div className="discover-movie__movie-card-title">{movie.title}</div>
                  <div className="discover-movie__movie-card-date">{getDateMonthAndYear(movie.releaseDate)}</div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </Background>
  );
}