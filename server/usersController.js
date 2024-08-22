import User from "../src/Backend/Models/user.js";
import session from "express-session";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("User", user);
    if (user) {
      //   const isMatch = await bcrypt.compare(password, user.password);
      const isPasswordMatch = password === user.password;

      console.log("isMatch", isPasswordMatch);
      if (isPasswordMatch) {
        req.session.user = { id: user._id, name: user.name, email: user.email };
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
        res.clearCookie("connect.sid");
        res.json({ msg: "User logged out" });
      }
    });
  } else {
    res.status(400).json({ error: "No session found" });
  }
};

export { login, signup, getUser, logout };
