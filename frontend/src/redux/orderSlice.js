import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",

  initialState: {
    orders: [],
  },

  reducers: {
    setOrders: (state, action) => {
      state.orders = Array.isArray(action.payload) ? action.payload : [];
    },

    resetOrders: (state) => {
      state.orders = [];
    },

    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const {
  setOrders,
  resetOrders,
  addOrder,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
