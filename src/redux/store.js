import { configureStore } from "@reduxjs/toolkit";
import addressRedux from "./addressRedux";
import cartReducer from "./cartRedux";
import orderRedux from "./orderRedux";
import productRedux from "./productRedux";
import userReducer from "./userRedux";
import whishRedux from "./whishRedux";

export const store = configureStore({
  reducer: {
    product: productRedux,
    cart: cartReducer,
    user: userReducer,
    order: orderRedux,
    whish: whishRedux,
    address: addressRedux,
  },
});
