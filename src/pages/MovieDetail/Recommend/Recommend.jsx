import React from "react";
import { useMovieRecommendQuery } from "../../../hooks/useMovieRecommend";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Col, Row } from "react-bootstrap";
import "./Recommend.style.css";
import { useNavigate } from "react-router-dom";

const Recommend = ({ id }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useMovieRecommendQuery({ id });

  if (isLoading) {
    return <Spinner animation="grow" />;
  }

  if (isError) {
    return <Alert variant="danger">{error?.message}</Alert>;
  }

  return (
    <div>
      <h3 className="mt-5 mb-3">Recommendataion({data.slice(0, 8).length})</h3>
      <Row>
        <Col xs={6} lg={6}>
          {data.slice(0, 4).map((recommend, index) => (
            <div
              onClick={() => navigate(`/movies/${recommend?.id}`)}
              key={index}
              className="recommend-img"
              style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${recommend.poster_path})`,
              }}
            ></div>
          ))}
        </Col>
        <Col xs={6} lg={6}>
          {data.slice(4, 8).map((recommend, index) => (
            <div
              onClick={() => navigate(`/movies/${recommend?.id}`)}
              key={index}
              className="recommend-img"
              style={
                recommend?.poster_path
                  ? {
                      backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${recommend?.poster_path})`,
                    }
                  : {}
              }
            >
                  {!recommend?.poster_path && <h3>{recommend?.title}</h3>}

            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Recommend;
