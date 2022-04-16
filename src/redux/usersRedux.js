import { createSlice } from "@reduxjs/toolkit";

const users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : {
      users: [],
      isFetching: false,
      error: false,
    };
const usersSlice = createSlice({
  name: "users",
  initialState: users,
  reducers: {
    //GET USERS
    getUsersRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(state));
    },
    getUsersFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    //DELETE USER
    deleteUsersRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((Item) => Item._id === action.payload.id),
        1
      );
    },
    deleteUsersFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },

    //UPDATE USER
    updateUsersRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUsersSuccess: (state, action) => {
      console.log(action.payload.res.data);
      state.isFetching = false;
      state.users[
        state.users.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.res.data.user;
    },
    updateUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //ADD USER
    addUsersRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload.user);
    },
    addUsersFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  deleteUsersRequest,
  deleteUsersSuccess,
  deleteUsersFailure,
  updateUsersRequest,
  updateUsersSuccess,
  updateUsersFailure,
  addUsersRequest,
  addUsersSuccess,
  addUsersFailure,
} = usersSlice.actions;
export default usersSlice.reducer;
