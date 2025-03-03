import React from "react";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();

  const navigate = useNavigate();

  // ids를 매핑하여 장르 name으로 반환.
  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  return (
    <div
      onClick={() => navigate(`/movies/${movie?.id}`)}
      // style={{
      //   backgroundImage:
      //     "url(" +
      //     `http://www.themoviedb.org/t/p/w1066_and_h600_bestv2${movie?.poster_path}` +
      //     ")",
      // }}
      style={{
        backgroundImage: `url(http://www.themoviedb.org/t/p/w1066_and_h600_bestv2${movie?.poster_path})`,
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h2>{movie?.title}</h2>
        {showGenre(movie.genre_ids).map((id, index) => (
          <Badge className="me-1" key={index} bg="danger">
            {id}
          </Badge>
        ))}
        <div>Vote {movie?.vote_average}</div>
        <div>Popularity {movie?.popularity}</div>
        <div>{movie?.adult ? "over18" : "under18"}</div>
      </div>
    </div>
  );
};

export default MovieCard;
