import { createSlice } from "@reduxjs/toolkit";

// Get currently logged-in user
const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("loggedInUser"));
};

// Get orders of currently logged-in user
const getUserOrders = () => {
  const user = getLoggedInUser();

  if (!user) {
    return [];
  }

  const orders = JSON.parse(localStorage.getItem("orders")) || {};

  return orders[user.email] || [];
};

// Save orders for currently logged-in user
const saveUserOrders = (ordersList) => {
  const user = getLoggedInUser();

  if (!user) {
    return;
  }

  const orders = JSON.parse(localStorage.getItem("orders")) || {};

  orders[user.email] = ordersList;

  localStorage.setItem("orders", JSON.stringify(orders));
};

const orderSlice = createSlice({
  name: "order",

  initialState: {
    orders: getUserOrders(),
  },

  reducers: {
    // Load user's orders after login
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    // Clear Redux when user logs out
    resetOrders: (state) => {
      state.orders = [];
    },

    // Add order for current user
    addOrder: (state, action) => {
      state.orders.push(action.payload);

      saveUserOrders(state.orders);
    },

    // Clear current user's orders
    clearOrders: (state) => {
      state.orders = [];

      saveUserOrders([]);
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