import { createSlice } from "@reduxjs/toolkit";

const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      products: [],
      amount: 0,
      total: 0,
      pay: false,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState: cart,
  reducers: {
    addProduct: (state, action) => {
      const isExist = state.products?.find(
        (product) =>
          product._id === action.payload._id &&
          product.color === action.payload.color &&
          product.size === action.payload.size
      );
      if (isExist !== undefined) {
        state.products?.map((product) =>
          product._id === action.payload._id
            ? (product.amount += action.payload.amount)
            : product
        );
        state.total += action.payload.price * action.payload.amount;
        localStorage.setItem("cart", JSON.stringify(state));
      } else {
        state.amount += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.amount;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeProduct: (state, action) => {
      console.log(action.payload.size, action.payload.color);
      state.amount -= 1;
      state.total -= action.payload.price * action.payload.amount;
      state.products = state.products.filter((product) => {
        if (
          product._id === action.payload._id &&
          product.color === action.payload.color &&
          product.size === action.payload.size
        ) {
          return false;
        }
        return true;
      });
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteCart: (state) => {
      Object.assign(state, {
        products: [],
        amount: 0,
        total: 0,
        pay: false,
      });
    },
    payCart: (state) => {
      state.pay = true;
    },
  },
});

export const { addProduct, removeProduct, deleteCart, payCart } =
  cartSlice.actions;
export default cartSlice.reducer;
