// import express from "express";
// import connectDB from "./src/Backend/Config/db.js";
// import dotenv from "dotenv";
// import userRoutes from "./src/Backend/Routes/userRoutes.js";
// import cookieParser from "cookie-parser";
// // import session from "express-session";
// import cors from "cors";
// import session from "express-session";
// import { addSignUp, authenticate, authRequired, destroySession, getAuthStatus } from "./src/Backend/Controllers/authController.js";

// dotenv.config();
// connectDB();

// const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(
//   session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
// );

// // app.use("/api/auth", userRoutes);
// app.post("/api/auth/signup", addSignUp)

// //Login
// app.post("/api/auth/login", authenticate)

// //Logout
// app.post("/api/auth/logout", authRequired, destroySession)

// //checks authentication
// app.get("/api/auth/status", getAuthStatus)

// app.get("/", async (req, res) => {
//   res.send("Hello From here!!");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
