import React, { useEffect, useState, useRef } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../common/MovieCard/MovieCard";
import { Container, Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import MovieSort from "./MovieSort/MovieSort";
import GenreFilter from "./GenreFilter/GenreFilter";
import "./MoviePage.css";

// 경로 2가지
// 1. nav 바에서 클릭해서 온 경우 => popularmovie 보여주기
// 2. keyword를 입력해서 온 경우 => 키워드와 관련된 영화 보여줌

//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할때마다 page 바꿔주기
// page 값이 바뀔때마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {
  //페이지네이션
  const [page, setPage] = useState(1);
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const pageRef = useRef(1);
  const keywordRef = useRef("");

  //영화 데이터 호출
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  //영화 정렬
  const [sortedMovie, setSortedMovie] = useState([]);
  const movieData = data?.results;

  //유즈이펙트 초기설정
  // useEffect(() => {
  //   if (
  //     data?.results &&
  //     (!prevDataRef.current ||
  //       data.results.length !== prevDataRef.current.length)
  //   ) {
  //     setSortedMovie(movieData);
  //     prevDataRef.current = data.results;
  //   }
  // }, [data, sortedMovie]);

  useEffect(() => {
    if (
      data?.results &&
      (movieData?.length == 0 ||
        data?.page !== pageRef.current ||
        keyword !== keywordRef.current)
    ) {
      setSortedMovie(movieData);
      pageRef.current = data?.page;
      keywordRef.current = keyword;
    }
  }, [data, sortedMovie, data?.page, keyword]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", width: "100%" }}
      >
        <Spinner className="spinner" animation="border" variant="info" />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error?.message}</Alert>;
  }

  if (data.results.length == 0) {
    return (
      <Alert className="text-center" variant="danger">
        결과가 없습니다.
      </Alert>
    );
  }

  return (
    <Container>
      <Row>
        <Col lg={4} sm={12} xs={12}>
          <div className="option-panel">
            <MovieSort setSortedMovie={setSortedMovie} data={data} />
            <GenreFilter data={data} setSortedMovie={setSortedMovie} />
          </div>
        </Col>
        <Col lg={8} xs={12}>
          <Row className="mt-3">
            {sortedMovie?.map((movie, index) => (
              <Col
                key={index}
                lg={4}
                md={4}
                sm={6}
                xs={12}
                className="mb-2 d-flex align-items-center justify-content-center"
              >
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
            pageCount={data?.total_pages} // 전체페이지
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1} //선택한 페이지
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
