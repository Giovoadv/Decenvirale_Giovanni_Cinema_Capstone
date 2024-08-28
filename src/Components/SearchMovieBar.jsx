import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./SearchMovieBar.css";

const SearchMovieBar = () => {
  const apiKey = "api_key=db95773a7fb212ba790d71f6adac0e7e";
  const [searchMovie, setSearchMovie] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const imgPath = "https://image.tmdb.org/t/p/w500";
  const [data, setData] = useState({});
  

  useEffect(() => {
    console.log("useEffect");
    async function fetchData() {
      if (searchMovie?.length > 0) {
        try {
          const res = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&${apiKey}`
          );

          console.log(res);

          if (res.status === 200) {
            const results = res?.data?.results;
            const searchMovieData = results?.length > 0 ? results[0] : null;

            setData(searchMovieData);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [openModal]);

  const inputValue = (e) => {
    setSearchMovie(e.target.value);
  };

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpenModal(false);

    setSearchMovie("");
  };
  return (
    <div className="searhBar">
      <div className="barWrapper" >
        <input
          type="text"
          placeholder="search movie"
          value={searchMovie}
          onChange={inputValue}
        />
        <svg
          onClick={() => handleClick()}
          // data-bs-toggle="modal"
          // data-bs-target="#exampleModal"
          style={{ height: "25px", fill: "white", marginLeft: "1rem" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </div>
      <Modal show={openModal} >
        <Modal.Dialog className="body">
          <Modal.Header className="head">
            <Modal.Title className="text">{data?.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="body">
            {data?.poster_path ? (
              <img
                src={imgPath + data?.poster_path}
                alt={data?.title}
                style={{ width: "100%" }}
              />
            ) : (
              "No poster available"
            )}
            <h2 className="movie-title">
              {data?.title || "No title available"}
            </h2>
            <p>{data?.overview}</p>
            <p>Release Data: {data?.release_date}</p>
          </Modal.Body>

          <button className="searchButton" onClick={handleClose}>Close</button>

          <Modal.Footer className="foot"></Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
};

export default SearchMovieBar;
