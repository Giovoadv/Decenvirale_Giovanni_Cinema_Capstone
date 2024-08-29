import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
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

dotenv.config({});

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

connectDB();

app.post("/signup", signup);

app.post("/login", login);

app.get("/user", getUser);

app.post("/logout", logout);

app.post("/favourite", addFavourite);

app.get("/favourite", getfavoriteMovies);

app.delete("/deleteFavorite/:id", deleteFavorite);

app.put("/changePassword", changePassword);

app.put("/changeName", changeName);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
