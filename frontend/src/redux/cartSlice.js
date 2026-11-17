import { createSlice } from "@reduxjs/toolkit";
import { sanitizeCartItems } from "./persistence";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
  },

  reducers: {
    setCart: (state, action) => {
      state.items = sanitizeCartItems(action.payload);
    },

    resetCart: (state) => {
      state.items = [];
    },

    addToCart: (state, action) => {
      const product = sanitizeCartItems([
        { ...action.payload, quantity: 1 },
      ])[0];

      if (!product) {
        return;
      }

      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );

      if (existingProduct && existingProduct.quantity < existingProduct.stock) {
        existingProduct.quantity += 1;
      } else if (!existingProduct) {
        state.items.push({
          ...product,
        });
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity < item.stock) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

    },

    clearCart: (state) => {
      state.items = [];
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
