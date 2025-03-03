import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "56vh", width: "100%" }}
      >
        <Spinner className="spinner" animation="border" variant="info" />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error?.message}</Alert>;
  }

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `http://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0]?.poster_path}` +
          "}",
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1>{data?.results[0]?.title}</h1>
        <p>{data?.results[0]?.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
