import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const ChangePassword = () => {
  const userData = useSelector((state) => state.user.user);
  const user = userData?.user;
  const { email } = user;
  const [newPassword, setNewPassword] = useState("");
  const navitage = useNavigate();

  const changePassword = async (e) => {
    try {
      const res = await axios.put("https://localhost:3002/changePassword", {
        email,
        newPassword,
      });
      alert("Password changed successfully");

      navitage("/profile");
      console.log(res);
    } catch (error) {
      console.error(" Error changing password", error);
      alert("Error changing password");
    }
  };

  const handleSubmitMewPassword = (e) => {
    e.preventDefault();
    changePassword();
  };

  return (
    <div>
      <div className="appWrapper">
        <section className="sidebar-wrapper">{/* <Sidebar /> */}</section>
        <section className="content-wrapper">
          <Navbar />
          <section className="content-body">
            <div className="loginWrapper">
              <div className="changeName">
                <h1>Change Password</h1>
                <form
                  className="loginContainer"
                  onSubmit={handleSubmitMewPassword}
                >
                  <label> New Password</label>
                  <input
                    type="password"
                    placeholder="Enter  new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}

                    // onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>

            <section>{/* <Footer /> */}</section>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;
