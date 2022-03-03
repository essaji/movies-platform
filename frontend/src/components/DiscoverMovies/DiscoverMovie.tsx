import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, Col, Empty, Rate, Row } from "antd";
import { useQuery } from "react-query";

import Background from "../Background/Background";
import { discoverMovie } from "../../services/services";
import "./discover-movie.scss";
import { Movie } from "../../types";
import { getDateMonthAndYear } from "../../utils/utils";
import SearchInput from "../SearchInput/SearchInput";

const MAX_TITLE_LENGTH = 38

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
        <SearchInput />
      </div>
      <div className="discover-movie">
        <Row gutter={{ xs: 4, sm: 8, md: 16, lg: 24 }} justify="center" style={{ paddingTop: 24 }}>
          {!query.data.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          {query.data.map((movie: Movie) => {
            const movieTitle = movie.title.length > MAX_TITLE_LENGTH ? movie.title.substring(0, MAX_TITLE_LENGTH) + "..." : movie.title
            return (
              <Col className="gutter-row" key={movie.id} style={{ paddingBottom: 24 }}>
                <Card
                  hoverable
                  style={{ height: 430, width: 200, overflow: "hidden" }}
                  cover={<img className="discover-movie__movie-thumbnail" src={movie.posterPath} alt="poster" />}
                  onClick={() => navigate(`/detail/${movie.id}`)}
                >
                  <Rate allowHalf disabled defaultValue={movie.voteAverage} />
                  <div className="discover-movie__movie-card-title">{movieTitle}</div>
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