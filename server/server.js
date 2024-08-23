import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import connectDB from "./db.js";
import User from "../src/Backend/Models/user.js";
import { login, signup, getUser, logout } from "./usersController.js";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(
  session({
    name: 'culo',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    httpOnly: false,
  })
);

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
