import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../Slices/userSlice";
import "./ChangeName.css";
const apiUrl = import.meta.env.VITE_BACK_END_URL;
const ChangeName = () => {
  const token = localStorage.getItem("authToken");
  const userData = useSelector((state) => state.user.user);
  const user = userData?.user;
  const { email } = user;
  const [newName, setNewName] = useState("");
  const navitage = useNavigate();
  const dispatch = useDispatch();

  const changingName = async (e) => {
    try {
      const res = await axios.put(
        `${apiUrl}/changeName`,
        {
          email,
          newName,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      alert("Name changed successfully");

      dispatch(
        login({
          user: res.data,
        })
      );
      navitage("/profile");
    } catch (error) {
      console.error(" Error changing name", error);
      alert("Error changing name");
    }
  };

  const handleSubmitMewPassword = (e) => {
    e.preventDefault();
    changingName();
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
                <h1>Change Profile Name</h1>
                <form
                  className="loginContainer"
                  onSubmit={handleSubmitMewPassword}
                >
                  <label> New Name</label>
                  <input
                    type="text"
                    placeholder="Enter new name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}

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

export default ChangeName;
