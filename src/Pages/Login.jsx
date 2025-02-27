import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Slices/userSlice";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

export const Login = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/login`, { email, password }, { withCredentials: true })
      .then((response) => {
        if (response?.data?.result === "Success") {
          const { token } = response?.data;
          console.log("User logged in successfully");

          // Save token in localStorage
          localStorage.setItem("authToken", token);

          axios
            .get(`${apiUrl}/user`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            })
            .then((res) => {
              if (res.data.user) {
                // Slice update
                dispatch(
                  login({
                    user: res.data.user,
                  })
                );
                // Redirect
                navigate("/profile", { state: { user: res.data.user } });
              }
            });
        } else {
          alert("User do not exist");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          alert("Password does not match");
        } else {
          alert("User do not exist");
        }
      });
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
              <div className="notAccount">
                <h3>Don't have an account?</h3>
                <Link to="/signup">Create a New Account</Link>
              </div>
            </div>
          </div>

          <section>{/* <Footer /> */}</section>
        </section>
      </section>
    </div>
  );
};
