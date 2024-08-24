import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SetLoggedInContext } from "../App";
import { useContext } from "react";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3002/logout",
        {},
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      if (res.status === 200) {
        console.log("User logged out successfully");
        localStorage.removeItem("userID");
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  // const setIsLoggedIn = useContext(SetLoggedInContext);
  // const navigate = useNavigate();
  // const handleLogout = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:3002/logout", {
  //       withCredentials: true,
  //     });

  //     if (res.status === 200) {
  //       console.log("User logged out successfully");
  //       setIsLoggedIn(false);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log("Error logging out", error);
  //   }
  // };

  return <button onClick={handleLogout}>LogoutButton</button>;
};

export default LogoutButton;
