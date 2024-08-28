import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../Slices/userSlice";
import "./ChangeName.css"; 

const ChangeName = () => {
  const userData = useSelector((state) => state.user.user);
  const user = userData?.user;
  const { email } = user;
  const [newName, setNewName] = useState("");
  const navitage = useNavigate();
  const dispatch = useDispatch();
  

  const changingName = async (e) => {
    try {
      const res = await axios.put("https://localhost:3002/changeName", {
        email,
        newName,
      });
      alert("Name changed successfully");
      console.log("RESPONSE ", res.data);

      dispatch(
        login({
          user: res.data,
        })
      );
      navitage("/profile");
      console.log(dispatch);
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
