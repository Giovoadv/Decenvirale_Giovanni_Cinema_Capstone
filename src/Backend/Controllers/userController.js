import React from "react";
import User from "../Models/user.js";
import session from "express-session";
import generateToken from "../utils/generateToken.js";


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({ name, email, password });

    if (user) {
      generateToken(res, user._id);
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.error("Error in Auth user", error);
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  // if (user && user.password === password) {
  //   req.session = user.email;
  //   res.json({ success: true, name: user.name });
  // } else {
  //   return res
  //     .status(401)
  //     .json({ success: false, message: "Invalid Email or Password" });
  // }
};
const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User Logged out" });
};
const userProfile = async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
};
const updateUserProfile = async (req, res) => {
  res.status(200).json({ message: "Update User Profile" });
};



export { authUser, registerUser, logoutUser, userProfile, updateUserProfile };
