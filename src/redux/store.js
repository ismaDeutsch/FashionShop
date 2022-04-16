import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import usersReducer from "./usersRedux";
import productReducer from "./productRedux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
