import React from "react";
import { Link } from "react-router-dom";
import SearchMovieBar from "./SearchMovieBar";
import { useCookies } from "react-cookie";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
const HomeNavbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userData = useSelector((state) => state.user.user);
  const user = userData?.user;

  return (
    <div>
      <div className="NavWrapper">
        <div className="title">Cinema </div>

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
