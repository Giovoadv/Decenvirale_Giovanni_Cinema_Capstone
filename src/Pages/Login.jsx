import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import "./Login.css";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { SetLoggedInContext } from "../App";
import { useContext } from "react";
import { set } from "mongoose";
import { useCookies } from "react-cookie";

export const Login = () => {
  const setIsLoggedIn = useContext(SetLoggedInContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navitate = useNavigate();
  const [_, setCookies] = useCookies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await axios.post("http://localhost:3002/login", {
        email,
        password,
      });
      setCookies("access_token", response.data.user);
      // window.localStorage.setItem("userID", response.data.userID);
      navitate("/profile", { state: { user: response.data.user } });
    } catch (error) {
      console.error(error);
    }

    // axios
    //   .post(
    //     "http://localhost:3002/login",
    //     { email, password },
    //     { withCredentials: true }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //     if (result.data === "Success") {
    //       console.log("User logged in successfully");
    //       // alert("User logged in successfully");
    //       axios
    //         .get("http://localhost:3002/user", { withCredentials: true })
    //         .then((res) => {
    //           if (res.data.user) {
    //             setIsLoggedIn(true);
    //             navitate("/profile", { state: { user: res.data.user } });
    //           }
    //         });
    //     } else {
    //       alert("User do not exist");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.response && error.response.status === 401) {
    //       alert("Password does not match");
    //     } else {
    //       alert("User do not exist");
    //     }
    //   });
  };

  return (
    <div className="appWrapper">
      <section className="sidebar-wrapper">{/* <Sidebar /> */}</section>
      <section className="content-wrapper">
        <Navbar />
        <section className="content-body">
          <div className="loginWrapper">
            <div>
              <h1>Sign In</h1>
              <form className="loginContainer" onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
              </form>
              <h3>Don't have an account?</h3>
              <Link to="/signup" type="submit">
                Create a New Account
              </Link>
            </div>
          </div>

          <section>{/* <Footer /> */}</section>
        </section>
      </section>
    </div>
  );
};
