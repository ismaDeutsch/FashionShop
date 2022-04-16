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

    //DELETE PRODUCT
    deleteProductRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
      localStorage.setItem("product", JSON.stringify(state));
    },
    deleteProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    //UPDATE PRODUCT
    updateProductRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      console.log(action.payload);
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.res.data.updateProduct;
      localStorage.setItem("product", JSON.stringify(state));
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //ADD PRODUCT
    addProductRequest: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload.product);
      localStorage.setItem("product", JSON.stringify(state));
    },
    addProductFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProductRequest,
  getProductSuccess,
  getProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  addProductRequest,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;
export default productSlice.reducer;
