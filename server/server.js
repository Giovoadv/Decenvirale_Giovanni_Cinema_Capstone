import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import  jwt from 'jsonwebtoken';

import {
  login,
  signup,
  getUser,
  logout,
  getfavoriteMovies,
  deleteFavorite,
  changePassword,
  changeName,
} from "./usersController.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { addFavourite } from "./usersController.js";

dotenv.config();

// JWT Secret Key
const JWT_SECRET = process.env.VITE_JWT_SECRET; 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/', // Cookie is valid for the entire domain
      secure: true, // Set to true if using HTTPS
      httpOnly: true, // Helps prevent XSS attacks
      maxAge: 3600000 // Cookie expiration time in milliseconds (1 hour)
    }
  })
);

// Middleware to authenticate requests
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

connectDB();

app.post("/signup", signup);

app.post("/login", login);

app.get("/user", authenticateJWT, getUser);

app.post("/logout", logout);

app.post("/favourite", authenticateJWT, addFavourite);

app.get("/favourite", authenticateJWT, getfavoriteMovies);

app.delete("/deleteFavorite/:id", authenticateJWT, deleteFavorite);

app.put("/changePassword", authenticateJWT, changePassword);

app.put("/changeName", authenticateJWT, changeName);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
