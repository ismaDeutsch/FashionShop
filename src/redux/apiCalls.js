import { loginFailure, loginRequest, loginSuccess } from "./userRedux";
import {
  addProductFailure,
  addProductRequest,
  addProductSuccess,
  deleteProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  getProductFailure,
  getProductRequest,
  getProductSuccess,
  updateProductFailure,
  updateProductRequest,
  updateProductSuccess,
} from "./productRedux";
import {
  addUsersFailure,
  addUsersRequest,
  addUsersSuccess,
  deleteUsersFailure,
  deleteUsersRequest,
  deleteUsersSuccess,
  getUsersFailure,
  getUsersRequest,
  getUsersSuccess,
  updateUsersFailure,
  updateUsersRequest,
  updateUsersSuccess,
} from "./usersRedux";
import { publicRequest, userRequest } from "../requestMethodes";

export const login = async (dispatch, user) => {
  dispatch(loginRequest());
  try {
    const res = await publicRequest.post("/user/login", user);
    const day = 24 * 60 * 60 * 1000;
    await window.cookieStore.set({
      name: "auth",
      value: res.data.token,
      expires: Date.now() + day,
    });
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

//PRODUCTS
export const getProduct = async (dispatch) => {
  dispatch(getProductRequest());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure(error));
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductRequest());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure(error));
  }
};

export const updateProduct = async (dispatch, id, product) => {
  dispatch(updateProductRequest());
  try {
    const res = await userRequest.put(`/products/${id}`, { product });
    dispatch(updateProductSuccess({ id, res }));
  } catch (error) {
    dispatch(updateProductFailure(error));
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(addProductRequest());
  try {
    const res = await userRequest.post(`/products`, { product });
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};

//USERS
export const getUser = async (dispatch) => {
  dispatch(getUsersRequest());
  try {
    const res = await userRequest.get("/user");
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    dispatch(getUsersFailure(error));
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUsersRequest());
  try {
    await userRequest.delete(`/user/${id}`);
    dispatch(deleteUsersSuccess(id));
  } catch (error) {
    dispatch(deleteUsersFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUsersRequest());
  try {
    const res = await userRequest.put(`/user/${id}`, user);
    dispatch(updateUsersSuccess({ id, res }));
  } catch (error) {
    dispatch(updateUsersFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUsersRequest());
  try {
    const res = await userRequest.post(`/user/register`, { ...user });
    dispatch(addUsersSuccess(res.data));
  } catch (error) {
    dispatch(addUsersFailure(error));
  }
};
