
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import {
  loadUserCart,
  loadUserOrders,
  persistUserCart,
  persistUserOrders,
} from "./persistence";

const persistenceMiddleware = (storeApi) => (next) => (action) => {
  const result = next(action);

  if (
    [
      "cart/addToCart",
      "cart/increaseQuantity",
      "cart/decreaseQuantity",
      "cart/removeFromCart",
      "cart/clearCart",
    ].includes(action.type)
  ) {
    persistUserCart(storeApi.getState().cart.items);
  }

  if (["order/addOrder", "order/clearOrders"].includes(action.type)) {
    persistUserOrders(storeApi.getState().order.orders);
  }

  return result;
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
  },
  preloadedState: {
    cart: { items: loadUserCart() },
    order: { orders: loadUserOrders() },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
});

export default store;

