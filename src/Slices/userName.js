import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null };

const changeNameSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    changeName(state, action) {
      console.log("ChangeName", state.user, action.payload);
      state.user = action.payload.user;
    },
  },
});

export const { changeName, logout } = changeNameSlice.actions;
export default changeNameSlice.reducer;
