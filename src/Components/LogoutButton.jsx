import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post("http://localhost:3002/logout", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          console.log("User logged out successfully");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log("Error logging out", error);
      });
  };

  return <button onClick={handleLogout}>LogoutButton</button>;
};

export default LogoutButton;
