import React from 'react'
import './movie-reviews.scss'
import { useQuery } from "react-query";
import { fetchMovieReviews } from "../../services/services";
import { useParams } from "react-router-dom";
import { Divider, Empty } from "antd";

export default function MovieReviews() {
  const { movieId } = useParams()
  const { isLoading, data: query } = useQuery<any>(`${movieId}_reviews`, () => fetchMovieReviews(movieId!!))
  if (isLoading) return <div className="loader" />
  const { data: reviews } = query
  return (
    <div className="movie-reviews">
      <Divider />
      <div className="movie-reviews__title">User Reviews</div>
      {!reviews.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No reviews yet!" />}
      {reviews.map((r: any, idx: number) => (
        <div className="movie-reviews__review" key={r.id}>
          <div className="movie-reviews__avatar-container">
            <img src={r.avatarPath || `https://ui-avatars.com/api/?name=${r.author}`} alt="" />
            {r.author}
          </div>
          <div className="movie-reviews__review-content">{`${r.content}`}</div>
          {(idx + 1) !== reviews.length && <Divider />}
        </div>
      ))}
    </div>
  )
}