import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Slices/userSlice";
import { CDBSidebarMenuItem } from "cdbreact";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const LogoutButton = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/logout`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      if (res.status === 200) {
        // Slice update
        dispatch(logout());

        console.log("User logged out successfully");

        // Clear token from localStorage
        localStorage.removeItem("authToken");

        // Redirect
        navigate("/home");
      }
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  return (
    <CDBSidebarMenuItem
      className="menuItem"
      icon="sign-out-alt"
      onClick={handleLogout}
    >
      Logout{" "}
    </CDBSidebarMenuItem>
  );
};

export default LogoutButton;
