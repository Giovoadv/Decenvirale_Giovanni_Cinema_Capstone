import React, { useEffect, useState } from "react";
import "../Components/Navbar.css";
import axios from "axios";
// import Modal from "./Modal";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import SearchMovieBar from "./SearchMovieBar";

const CinemaNavbar = () => {
  // const apiKey = "api_key=db95773a7fb212ba790d71f6adac0e7e";
  // const [searchMovie, setSearchMovie] = useState("");
  // const [openModal, setOpenModal] = useState(false);
  // const imgPath = "https://image.tmdb.org/t/p/w500";
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   console.log("useEffect");
  //   async function fetchData() {
  //     if (searchMovie?.length > 0) {
  //       try {
  //         const res = await axios.get(
  //           `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&${apiKey}`
  //         );

  //         console.log(res);

  //         if (res.status === 200) {
  //           const results = res?.data?.results;
  //           const searchMovieData = results?.length > 0 ? results[0] : null;

  //           setData(searchMovieData);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  //   fetchData();
  // }, [openModal]);

  // const inputValue = (e) => {
  //   setSearchMovie(e.target.value);
  // };

  // const handleClick = () => {
  //   setOpenModal(true);
  // };

  // const handleClose = (e) => {
  //   e.preventDefault();
  //   setOpenModal(false);

  //   setSearchMovie("");
  // };

  return (
    <div className="content-wrapper">
      <div className="NavWrapper">
        <div className="title">Cinema </div>
        {/* <SearchMovieBar /> */}

        <Link className="btn btn-primary" to="/login">
          Login
        </Link>

        <div className="dropDown-wrapper">
          <select className="dropDown">
            <option>Forney</option>
            <option>Rockwall</option>
            <option>Sunnyvalle</option>
            <option>Mesquite</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CinemaNavbar;
