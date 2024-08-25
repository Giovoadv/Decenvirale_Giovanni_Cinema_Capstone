import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Footer from "./Footer";
import FeaturedMovies from "./FeaturedMovies";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidebar from "./Sidebar";
import Carousels from "./Carousel";

import SearchMovieBar from "./SearchMovieBar";
import HomeNavbar from "./HomeNavbar";

const Home = () => {
  const [movieType, setMovieType] = useState("now_playing");

  const handleClick = (e, value) => {
    e.preventDefault();
    setMovieType(value);
    console.log("click ", value);
  };

  return (
    <div className="appWrapper">
      {/* <section className="sidebar-wrapper">
        <Sidebar handleClick={handleClick} />
        </section> */}
      <section className="content-wrapper">
        {/* <SearchMovieBar /> */}
        <HomeNavbar />
        <section className="content-body">
          <section className="carousel-wrapper">
            <Carousels />
          </section>
          <section>
            <FeaturedMovies movieType={movieType} handleClick={handleClick} />
          </section>
          <section>{/* <Footer /> */}</section>
        </section>
      </section>
    </div>
  );
};

export default Home;
