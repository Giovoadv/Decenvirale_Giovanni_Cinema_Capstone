import { createSlice } from "@reduxjs/toolkit";

const initialState = { favoriteMovies: [] };

const favoriteMoviesSlice = createSlice({
  name: "favoriteMoviesSlice",
  initialState,
  reducers: {
    favorite(state, action) {
      state.favoriteMovies = action.payload;
    },
    clearFavorites(state) {
      state.favoriteMovies = [];
    },
  },
});

export const { favorite, clearFavorites } = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;
