import { createSlice } from "@reduxjs/toolkit";

const products = localStorage.getItem("product")
  ? JSON.parse(localStorage.getItem("product"))
  : {
      products: [],
      isFetching: false,
      error: false,
    };

const productSlice = createSlice({
  name: "product",
  initialState: products,
  reducers: {
    //GET ALL
    getProductRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
      localStorage.setItem("product", JSON.stringify(state));
    },
    getProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { getProductRequest, getProductSuccess, getProductFailure } =
  productSlice.actions;
export default productSlice.reducer;
