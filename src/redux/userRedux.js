import { createSlice } from "@reduxjs/toolkit";

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
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(state));
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      window.cookieStore.delete("auth");
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
