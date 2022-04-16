import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {
      currentUser: null,
      isFetching: false,
      error: false,
    };

const userSlice = createSlice({
  name: "user",
  initialState: user,
  reducers: {
    loginRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
      localStorage.setItem("user", JSON.stringify(state));
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("order");
      Cookies.remove("auth");
      Object.assign(state, {
        currentUser: null,
        isFetching: false,
        error: false,
      });
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
