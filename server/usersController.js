import User from "../src/Backend/Models/user.js";
import session from "express-session";
import Movies from "../src/Backend/Models/movies.js";
import  jwt from 'jsonwebtoken';

const login = async (req, res) => {
  const JWT_SECRET = process.env.VITE_JWT_SECRET;
  const { email, password } = req.body;

  console.log('JWT_SECRET ', JWT_SECRET);
  try {
    const user = await User.findOne({ email });
    if (user) {
      //   const isMatch = await bcrypt.compare(password, user.password);
      const isPasswordMatch = password === user.password;
      if (isPasswordMatch) {
        // Create and assign a JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Save session
        req.session.user = { id: user._id, name: user.name, email: user.email };
        req.session.save();
        console.log("LOGIN ------------ ", req.session);

        res.json({ token, result: "Success" });

      } else {
        res.status(401).json({ msg: "Password does not match" });
      }
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

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
  if (req.user) {
    res.json({ user: req.user });
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
        res.clearCookie("connect.sid"); // Clear the session cookie
        res.json({ msg: "User logged out" });
      }
    });
  } else {
    res.status(400).json({ error: "No session found" });
  }
};

const addFavourite = async (req, res) => {
  if (req.user) {
    const { email } = req.user;
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
  if (req.user) {
    const { email } = req?.user;

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
  if (req.user) {
    const { email } = req?.user;
    const id = req.params.id;

    try {
      const deleteMovie = await Movies.deleteOne({ movieId: id, email: email });
      if (deleteMovie?.deletedCount > 0) {
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

const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changeName = async (req, res) => {
  const { email, newName } = req.body;

  if (!email || !newName) {
    return res.status(400).json({ message: "Email and name are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = newName;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error changing name:", error);
    res.status(500).json({ message: "Internal server error" });
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
  changePassword,
  changeName,
};
