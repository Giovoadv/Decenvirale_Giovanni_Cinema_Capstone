import React from "react";
import Sidebar from "../Components/Sidebar";
import CinemaNavbar from "../Components/CinemaNavbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const Register = () => {
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
              <h1>Register</h1>
              <form className="loginContainer">
                <label htmlFor="">Name</label>
                <input type="text" />
                <label htmlFor="">Email</label>
                <input type="text" />
                <label htmlFor="">Password</label>
                <input type="text" />
                <Link className="btn btn-primary" to="/login">Register</Link>
              </form>
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

export default Register;
