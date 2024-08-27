import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userData = useSelector((state) => state.user.user);
  const user = userData?.user;

  return (
    <div>
      <div className="NavWrapper">
        <div className="title">Cinema </div>

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
