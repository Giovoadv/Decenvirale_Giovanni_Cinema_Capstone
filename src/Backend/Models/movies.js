import mongoose from "mongoose";
import bcrypt from "bcrypt";

const movieSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
    },
    email: {
      type: String,
    },
  }
);

const Movies = mongoose.model("User Movies", movieSchema);
export default Movies;
