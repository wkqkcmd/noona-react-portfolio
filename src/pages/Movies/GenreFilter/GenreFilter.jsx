import React from "react";
import "./GenreFilter.style.css";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useMovieGenreQuery } from "../../../hooks/useMovieGenre";

//data 이름 겹치지않게 destructing
const GenreFilter = ({ data: movieData, setSortedMovie }) => {
  const { data, isLoading, isError, error } = useMovieGenreQuery();

  if (isLoading) {
    return <Spinner animation="grow" />;
  }

  if (isError) {
    return <Alert variant="danger">{error?.message}</Alert>;
  }

  const filteredMovie = (id) => {
    const filteredData = movieData?.results?.filter((movie) => {
      return movie?.genre_ids?.includes(id);
    });
    setSortedMovie(filteredData);
    console.log("filter",filteredData)
    return filteredData;
  };

  return (
    <div className="filter">
      <h5 className="filter-title"> Genre</h5>
      {data?.map((genre, index) => (
        <button
          onClick={() => filteredMovie(genre.id)}
          className="genre-button"
          key={index}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
