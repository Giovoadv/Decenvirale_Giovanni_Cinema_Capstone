import { patch } from "@mui/material";
import User from "../src/Backend/Models/user.js";
import session from "express-session";
import jwt from "jsonwebtoken";
import Movies from "../src/Backend/Models/movies.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      //   const isMatch = await bcrypt.compare(password, user.password);
      const isPasswordMatch = password === user.password;
      if (isPasswordMatch) {
        req.session.user = { id: user._id, name: user.name, email: user.email };
        req.session.save();
        console.log("LOGIN ------------ ", req.session);

        res.json("Success");
      } else {
        res.status(401).json({ msg: "Password does not match" });
      }
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
  req.session.isAuth = true;
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
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Failed to logout" });
      } else {
        res.clearCookie("session", {
          path: "/",
          domain: "localhost",
        });

        res.json({ msg: "User logged out" });
      }
    });
  } else {
    res.status(400).json({ error: "No session found" });
  }
};

const addFavourite = async (req, res) => {
  if (req.session) {
    const { email } = req.session.user;
    const { id } = req.body.movie;

    try {
      const existingMovie = await Movies.findOne({ movieId: id, email: email });
      if (existingMovie) {
        return res
          .status(400)
          .json({ msg: "Movie already added to favorites" });
      }
      const favoriteMovie = await Movies.create({
        movieId: id,
        email: email,
      });

      res.json(favoriteMovie);
    } catch (error) {
      console.error(`Error: ${error} `);
      res.status(500).json({ error: error.message });
    }
  }
};

const getfavoriteMovies = async (req, res) => {
  if (req.session.user) {
    const { email } = req.session?.user;
    console.log("GET FAVORITES EMAIL ", email);

    try {
      const favoriteMovies = await Movies.find({ email: email });
      const movieIDs = favoriteMovies?.map((movie) => movie.movieId);

      res.json(movieIDs);
    } catch (error) {
      console.error(`Error: ${error} `);
      res.status(500).json({ error: error.message });
    }
  }
};

const deleteFavorite = async (req, res) => {
  if (req.session) {
    const { email } = req.session?.user;
    const id = req.params.id;

    try {
      const deleteMovie = await Movies.deleteOne({ movieId: id, email: email });
      if (deleteMovie?.deletedCount > 0) {
        console.log(deleteMovie);
        res.status(200).json("Movie Deleted Successfully");
      } else {
        res.status(400).json("Movie could not be deleted");
      }
    } catch (error) {
      console.error(`Error: ${error} `);
      res.status(500).json({ error: error.message });
    }
  }
};

export {
  login,
  signup,
  getUser,
  logout,
  addFavourite,
  getfavoriteMovies,
  deleteFavorite,
};
