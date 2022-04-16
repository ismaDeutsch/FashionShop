import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getAddressRequest: (state) => {
      state.isFetching = true;
    },
    getAddressSuccess: (state, action) => {
      state.isFetching = false;
      state.address = action.payload[0].address;
    },
    getAddressFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addAddressRequest: (state) => {
      state.isFetching = true;
    },
    addAddressSuccess: (state, action) => {
      state.isFetching = false;
      state.address = action.payload;
    },
    addAddressFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    deleteAddressRequest: (state) => {
      state.isFetching = true;
    },
    deleteAddressSuccess: (state, action) => {
      state.isFetching = false;
      state.address.splice(
        state.address.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteAddressFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    updateAddressRequest: (state) => {
      state.isFetching = true;
    },
    updateAddressSuccess: (state, action) => {
      state.isFetching = false;
      state.address[
        state.address.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.address;
    },
    updateAddressFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAddressRequest,
  getAddressSuccess,
  getAddressFailure,
  addAddressRequest,
  addAddressSuccess,
  addAddressFailure,
  deleteAddressRequest,
  deleteAddressSuccess,
  deleteAddressFailure,
  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFailure,
} = addressSlice.actions;
export default addressSlice.reducer;
