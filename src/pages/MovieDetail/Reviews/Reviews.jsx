import React, { useState } from "react";
import { useMovieReviewsQuery } from "../../../hooks/useMovieReviews";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import "./Reviews.style.css";

const Reviews = ({ id }) => {
  // 더보기의 상태를 배열로 개별적으로 관리 / 리뷰 3개
  const [expandedStates, setExpandedStates] = useState(Array(3).fill(false));

  // API 호출
  const { data, isLoading, isError, error } = useMovieReviewsQuery({
    id,
  });

  if (isLoading) {
    return <Spinner animation="border" variant="info" />;
  }

  if (isError) {
    return <Alert variant="danger">{error?.message}</Alert>;
  }

  // 더보기 버튼 토글 함수
  const toggleExpand = (index) => {
    setExpandedStates((prev) =>
      prev.map((state, i) => (index === i ? !state : state))
    );
  };

  return (
    <div>
      <h3 className="mb-3">Review({data.results.slice(0,3).length})</h3>
      {data.results.slice(0, 3).map((review, index) => {
        const isExpanded = expandedStates[index];
        return (
          <div className="review-card" key={index}>
            <h5>{review?.author}</h5>
            <p>
              {isExpanded ? review.content : review.content.substr(0, 300)}
              {review?.content?.length >= 300 && !isExpanded ? "..." : ""}
            </p>
            <button onClick={() => toggleExpand(index)}>
              {review?.content?.length <= 300 ? null : isExpanded ? "접기" : "더보기"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
