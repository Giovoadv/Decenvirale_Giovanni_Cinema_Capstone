import { patch } from "@mui/material";
import User from "../src/Backend/Models/user.js";
import session from "express-session";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  const isPasswordMatch = password === user.password;
  if (!isPasswordMatch) {
    return res.status(401).json({ msg: "Password does not match" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
  // try {
  //   const user = await User.findOne({ email });
  //   if (user) {
  //     //   const isMatch = await bcrypt.compare(password, user.password);
  //     const isPasswordMatch = password === user.password;
  //     if (isPasswordMatch) {
  //       req.session.user = { id: user._id, name: user.name, email: user.email };
  //       console.log(req.session);
  //       res.json("Success");
  //     } else {
  //       res.status(401).json({ msg: "Password does not match" });
  //     }
  //   } else {
  //     res.status(404).json({ msg: "User not found" });
  //   }
  // } catch (error) {
  //   res.status(500).json({ msg: error.message });
  // }
  // req.session.isAuth = true;
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    console.error(`Error: ${error} `);
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ msg: "Not authenticated" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("access_token", { path: "/", domain: "localhost" });

  return res.status(200).json({ msg: "User logged out" });

  // console.log(req.session);
  // if (req.session) {
  //   req.session.destroy((err) => {
  //     if (err) {
  //       res.status(500).json({ error: "Failed to logout" });
  //     } else {
  //       res.clearCookie("culo", {
  //         path: "/",
  //         _expires: null,
  //         originalMaxAge: null,
  //         httpOnly: true,
  //       });

  //       res.json({ msg: "User logged out" });
  //     }
  //   });
  // } else {
  //   res.status(400).json({ error: "No session found" });
  // }
};

export { login, signup, getUser, logout };
