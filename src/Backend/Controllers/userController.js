import React from "react";
import User from "../Models/user.js";
import session from "express-session";

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

  const user = await User.findOne({ email });

  if (user && user.password === password) {
    req.session = user.email;
    res.json({ success: true, name: user.name });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Email or Password" });
  }
};
const logoutUser = async (req, res) => {
 
  if (!req.session.email) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    req.session.destroy();
    res.json({ success: true });
  }
};
const userProfile = async (req, res) => {
  res.status(200).json({ message: "User Profile" });
};
const updateUserProfile = async (req, res) => {
  res.status(200).json({ message: "Update User Profile" });
};

export { authUser, registerUser, logoutUser, userProfile, updateUserProfile };
