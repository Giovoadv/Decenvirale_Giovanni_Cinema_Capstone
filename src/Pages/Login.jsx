import React from "react";
import CinemaNavbar from "../Components/CinemaNavbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import "./Login.css";
export const Login = () => {
  return (
    <div className="appWrapper">
      {/* <BrowserRouter> */}
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
                <button>Sign in</button>
              </form>
            </div>
          </div>

          <section>
            <Footer />
          </section>
        </section>
      </section>
      {/* </BrowserRouter> */}
    </div>
  );
};
