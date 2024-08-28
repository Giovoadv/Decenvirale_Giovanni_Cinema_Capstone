import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import CinemaNavbar from "../Components/CinemaNavbar";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navitate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    axios
      .post("http://localhost:3002/signup", { name, email, password })
      .then((res) => {
        if (res.status === 201) {
          console.log("User created successfully");
          alert("User created successfully");
          navitate("/login");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          window.alert("User already exists");
        } else {
          console.log(error);
        }
      });
  };
  return (
    <div className="appWrapper">
      {/* <section className="sidebar-wrapper">
        
      </section> */}
      <section className="content-wrapper">
        <Navbar />
        <section className="content-body">
          <div className="loginWrapper">
            <div>
              <h1>Register</h1>
              <form className="loginContainer" onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
              <div className="notAccount">
                <h3>Already have an account?</h3>
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>

          {/* <section>
            <Footer />
          </section> */}
        </section>
      </section>
    </div>
  );
};

export default Register;
