import { createSlice } from "@reduxjs/toolkit";

const whish = {
  products: [],
  isFetching: false,
  error: false,
};

const whishSlice = createSlice({
  name: "whish",
  initialState: whish,
  reducers: {
    getWhishRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getWhishSuccess: (state, action) => {
      state.isFetching = false;
      if (action.payload.length > 0) state.products = action.payload[0].products;
    },
    getWhishFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    addToWhishRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addToWhishSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addToWhishFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    removeFromWhishRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    removeFromWhishSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    removeFromWhishFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    deleteWhish: () => whish,
  },
});

export const {
  getWhishRequest,
  getWhishSuccess,
  getWhishFailure,
  addToWhishRequest,
  addToWhishSuccess,
  addToWhishFailure,
  removeFromWhishRequest,
  removeFromWhishSuccess,
  removeFromWhishFailure,
  deleteWhish,
} = whishSlice.actions;
export default whishSlice.reducer;
