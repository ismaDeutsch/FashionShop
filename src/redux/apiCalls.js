import { loginFailure, loginRequest, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getOrderFailure,
  getOrderRequest,
  getOrderSuccess,
} from "./orderRedux";
import {
  getProductFailure,
  getProductRequest,
  getProductSuccess,
} from "./productRedux";
import {
  addToWhishFailure,
  addToWhishRequest,
  addToWhishSuccess,
  getWhishFailure,
  getWhishRequest,
  getWhishSuccess,
  removeFromWhishFailure,
  removeFromWhishRequest,
  removeFromWhishSuccess,
} from "./whishRedux";
import {
  addAddressFailure,
  addAddressRequest,
  addAddressSuccess,
  deleteAddressFailure,
  deleteAddressRequest,
  deleteAddressSuccess,
  getAddressFailure,
  getAddressRequest,
  getAddressSuccess,
  updateAddressFailure,
  updateAddressRequest,
  updateAddressSuccess,
} from "./addressRedux";

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

export const getAddress = async (dispatch, id) => {
  dispatch(getAddressRequest());
  try {
    const res = await userRequest.get(`/user/address/find/${id}`);
    dispatch(getAddressSuccess(res.data));
  } catch (error) {
    dispatch(getAddressFailure());
  }
};

export const addAddress = async (dispatch, id, address) => {
  dispatch(addAddressRequest());
  try {
    const res = await publicRequest.post(`/user/address-new`, { id, address });
    dispatch(addAddressSuccess(res.data));
  } catch (error) {
    dispatch(addAddressFailure());
  }
};

export const deleteAddress = async (dispatch, id, userId) => {
  dispatch(deleteAddressRequest());
  try {
    await userRequest.delete(`/user/address/${id}/${userId}`);
    dispatch(deleteAddressSuccess(id));
  } catch (error) {
    dispatch(deleteAddressFailure());
  }
};

export const updateAddress = async (dispatch, id, userId, address) => {
  dispatch(updateAddressRequest());
  try {
    await userRequest.put(`/user/address/${id}/${userId}`, { address });
    dispatch(updateAddressSuccess({ id, address }));
  } catch (error) {
    dispatch(updateAddressFailure());
  }
};

export const getOrders = async (dispatch, id) => {
  dispatch(getOrderRequest());
  try {
    const res = await userRequest.get(`/orders/find/${id}`);
    dispatch(getOrderSuccess(res.data));
  } catch (error) {
    dispatch(getOrderFailure());
  }
};

export const getProduct = async (dispatch, cat) => {
  dispatch(getProductRequest());
  try {
    const res = cat
      ? await publicRequest.get(`/products?category=${cat}`)
      : await publicRequest.get(`/products`);
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure(error));
  }
};

export const getWhish = async (dispatch, id) => {
  dispatch(getWhishRequest());
  try {
    const res = await userRequest.get(`/whish/collect/${id}`);
    dispatch(getWhishSuccess(res.data));
  } catch (error) {
    dispatch(getWhishFailure(error));
  }
};

export const addToWhish = async (dispatch, id, productId) => {
  dispatch(addToWhishRequest());
  try {
    await userRequest.post(`/whish/${id}`, {
      productId: productId,
    });
    dispatch(addToWhishSuccess(productId));
  } catch (error) {
    dispatch(addToWhishFailure(error));
  }
};

export const removeFromWhish = async (dispatch, id, productId) => {
  dispatch(removeFromWhishRequest());
  try {
    await userRequest.put(`/whish/update/${id}`, {
      productId: productId,
      type: "remove",
    });
    dispatch(removeFromWhishSuccess(id));
  } catch (error) {
    dispatch(removeFromWhishFailure(error));
  }
};
