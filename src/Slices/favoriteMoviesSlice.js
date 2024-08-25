import { createSlice } from "@reduxjs/toolkit";

const initialState = { favoriteMovies: [] };

const favoriteMoviesSlice = createSlice({
  name: "favoriteMoviesSlice",
  initialState,
  reducers: {
    favorite(state, action) {
      console.log("sliceFavorite", state.user, action.payload);
      const movieID = action.payload;
      state.favoriteMovies.push(movieID);
    },
    unfavorite(state, action) {
      const movieID = action.payload;
      const idx = state.favoriteMovies.findIndex((id) => {
        id === movieID;
      });
      state.favoriteMovies.splice(idx, 1);
    },
  },
});

export const { favorite, unfavorite } = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;
