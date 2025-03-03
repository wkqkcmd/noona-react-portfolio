import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovies";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "473px", width: "100%" }}
      >
        <Spinner className="spinner" animation="border" variant="info" />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error?.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider
        responsive={responsive}
        title="Upcoming Movies"
        movies={data.results}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
