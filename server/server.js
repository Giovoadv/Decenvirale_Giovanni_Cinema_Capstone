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


console.log(ENV);
dotenv.config({});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  session({
    name: "Session",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: null,
    },
  })
);

connectDB();

/*app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      autoRemove: "interval",
      autoRemoveInterval: 1, // In minutes. Default
    }),
    unset: "destroy",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);*/

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
