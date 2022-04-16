import { createSlice } from "@reduxjs/toolkit";

const order = localStorage.getItem("order")
  ? JSON.parse(localStorage.getItem("order"))
  : {
      orders: null,
      isFetching: false,
      error: false,
    };

const orderSlice = createSlice({
  name: "order",
  initialState: order,
  reducers: {
    getOrderRequest: (state) => {
      state.isFetching = true;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
      localStorage.setItem("order", JSON.stringify(state));
    },
    getOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getOrderRequest, getOrderSuccess, getOrderFailure } =
  orderSlice.actions;
export default orderSlice.reducer;
