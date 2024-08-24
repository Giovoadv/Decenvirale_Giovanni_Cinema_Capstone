import React from "react";
import LogoutButton from "../Components/LogoutButton";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Profile.css";

const Profile = () => {
  const location = useLocation();

  const user = location.state?.user;
  console.log("user", user);
  return (
    <div className="appWrapper">
      <div className="content-wrapper">
        <Navbar />
        <div className="profileContent">
          <h1>Welcome Home {user && user.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
