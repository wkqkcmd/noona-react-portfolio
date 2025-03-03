import React from "react";
import { Badge, Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMovieDetail } from "../../hooks/useMovieDetail";
import "./MovieDetailPage.css";
import Reviews from "./Reviews/Reviews";
import Recommend from "./Recommend/Recommend";
import Videos from "./Videos/Videos";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

//포스터, 제목, 인기도, 줄거리, 예산(,+숫자), 개봉일
// 그리드

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetail({ id });

  if (isLoading) {
    return <Spinner animation="grow" />;
  }

  if (isError) {
    return <Alert variant="danger">{error?.message}</Alert>;
  }

  return (
    <Container>
      <Row className="detail-card">
        <Col md={5} xs={12}>
          <div
            className="detail-img"
            style={{
              backgroundImage: `url(${
                data?.poster_path
                  ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path}`
                  : `https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg`
              })`,
            }}
          >
          </div>
        </Col>

        <Col md={7} xs={12}>
          {(data?.genres).map((id, index) => (
            <Badge className="me-1" key={index} bg="danger">
              {id.name}
            </Badge>
          ))}
          <h1>{data?.title}</h1>
          <p>{data?.overview}</p>
          <div>popularity: {data?.popularity}</div>
          <div>
            budget: $ {data?.budget ? data?.budget.toLocaleString("ko-KR") : ""}
          </div>
          <div>{data?.release_date}</div>
          <Videos id={id} />
        </Col>
      </Row>
      <Reviews id={id} />
      <Recommend id={id} />
    </Container>
  );
};

export default MovieDetailPage;
