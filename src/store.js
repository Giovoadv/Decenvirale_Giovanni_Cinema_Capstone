import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import favoriteMoviesSlice from "./Slices/favoriteMoviesSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    favoriteMoviesSlice: favoriteMoviesSlice
  },
  devTools: true,
});

export default store;
