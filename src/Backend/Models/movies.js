import mongoose from "mongoose";
import bcrypt from "bcrypt";

const movieSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
    },
    
    
  },
  {
    timestamps: true,
  }
);