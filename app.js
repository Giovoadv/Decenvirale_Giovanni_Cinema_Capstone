import express from "express";
import connectDB from "./src/Backend/Config/db.js";
import dotenv from "dotenv";
import userRoutes from "./src/Backend/Routes/userRoutes.js";
import errorHandler from "./src/Backend/Config/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);

app.get("/", async (req, res) => {
  res.send("Hello From here!!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
