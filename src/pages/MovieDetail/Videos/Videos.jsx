import React, { useState } from "react";
import { useMovieVideosQuery } from "../../../hooks/useMovieVideos";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import YouTube from "react-youtube";
import "./Videos.style.css";

const Videos = ({ id }) => {
  //리액트 유튜브
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  //모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data, isLoading, isError, error } = useMovieVideosQuery({ id });

  if (isLoading) {
    return <Spinner animation="border" variant="info" />;
  }

  if (isError) {
    return <Alert variant="danger">{error?.message}</Alert>;
  }

  if (data.length == 0) {
    return;
  }

  return (
    <div>
      <Button className="mt-3" variant="danger" onClick={handleShow}>
        예고편 보기
      </Button>

      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
          }}
        >
          <YouTube videoId={data[0]?.key} opts={opts} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Videos;
