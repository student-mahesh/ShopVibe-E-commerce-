import { createSlice } from "@reduxjs/toolkit";

// Get currently logged-in user
const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("loggedInUser"));
};

// Get current user's cart from localStorage
const getUserCart = () => {
  const user = getLoggedInUser();

  if (!user) {
    return [];
  }

  const carts =
    JSON.parse(localStorage.getItem("carts")) || {};

  return carts[user.email] || [];
};

// Save current user's cart
const saveUserCart = (items) => {
  const user = getLoggedInUser();

  // If nobody is logged in, don't save anything
  if (!user) {
    return;
  }

  const carts =
    JSON.parse(localStorage.getItem("carts")) || {};

  carts[user.email] = items;

  localStorage.setItem(
    "carts",
    JSON.stringify(carts)
  );
};

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: getUserCart(),
  },

  reducers: {
    // ONLY changes Redux.
    // It does NOT save to localStorage.
    setCart: (state, action) => {
      state.items = action.payload;
    },

    // ONLY clears Redux.
    // It does NOT save to localStorage.
    // Important for logout/login.
    resetCart: (state) => {
      state.items = [];
    },

    addToCart: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      saveUserCart(state.items);
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
        saveUserCart(state.items);
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveUserCart(state.items);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      saveUserCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];

      // This one DOES save [].
      // Used when the user intentionally clears
      // their own cart.
      saveUserCart([]);
    },
  },
});

export const {
  setCart,
  resetCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;