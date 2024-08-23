import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IsLoggedInContext } from "../App";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const isLoggedIn = useContext(IsLoggedInContext);
  return (
    <div>
      <div className="NavWrapper">
        <div className="title">Cinema </div>

        <Link className="btn btn-primary" to="/login">
          Login
        </Link>
        {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <>
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          </>
        )}

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

export default Navbar;
