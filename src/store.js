import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import favoriteMoviesSlice from "./Slices/favoriteMoviesSlice";
import changeNameSlice from "./Slices/userName";

const store = configureStore({
  reducer: {
    user: userSlice,
    favoriteMoviesSlice: favoriteMoviesSlice,
    nameChange: changeNameSlice,
  },
  devTools: true,
});

export default store;
