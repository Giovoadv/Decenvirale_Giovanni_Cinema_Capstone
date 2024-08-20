import React from "react";
import CinemaNavbar from "../Components/CinemaNavbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import "./Login.css";
import { Link } from "react-router-dom";
export const Login = () => {
  return (
    <div className="appWrapper">
      <section className="sidebar-wrapper">
        <Sidebar />
      </section>
      <section className="content-wrapper">
        <CinemaNavbar />
        <section className="content-body">
          <div className="loginWrapper">
            <div>
              <h1>Sign In</h1>
              <form className="loginContainer">
                <label htmlFor="">Username</label>
                <input type="text" />
                <label htmlFor="">Password</label>
                <input type="text" />
                <Link className="btn btn-primary">Sign in</Link>
              </form>
              <h3>Don't have an account?</h3>
              <Link to="/register">Create a New Account</Link>
            </div>
          </div>

          <section>
            <Footer />
          </section>
        </section>
      </section>
    </div>
  );
};
