import React from "react";
import "./MovieSort.style.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const MovieSort = ({ data, setSortedMovie }) => {
  // 스프레드 연산자로 배열복사해서 사용.
  const popularityMovie = [...data?.results].sort(
    (a, b) => b.popularity - a.popularity
  );
  const lowPopularityMovie = data.results.sort(
    (a, b) => a.popularity - b.popularity
  );

  return (
    <div className="sort-box">
      <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle
          id="dropdown-button-dark-example1"
          variant="secondary"
          size="lg"
          className="sort-button"
        >
          정렬
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            className="sort-button"
            onClick={() => setSortedMovie(popularityMovie)}
            href="#/action-1"
            active
          >
            높은 인기순
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setSortedMovie(lowPopularityMovie)}
            href="#/action-2"
            className="sort-button"
          >
            낮은 인기순
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default MovieSort;
