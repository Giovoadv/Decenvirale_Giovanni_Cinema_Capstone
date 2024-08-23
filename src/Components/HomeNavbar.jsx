import React from "react";
import { Link } from "react-router-dom";
import SearchMovieBar from "./SearchMovieBar";

const HomeNavbar = () => {
  return (
    <div>
      <div className="NavWrapper">
        <div className="title">Cinema </div>

        <Link className="btn btn-primary" to="/login">
          Login
        </Link>
        <SearchMovieBar />

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

export default HomeNavbar;
