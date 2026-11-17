import { beforeEach, describe, expect, it } from "vitest";
import cartReducer, {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "./cartSlice";
import {
  persistUserCart,
  sanitizeCartItems,
  validateCartItems,
} from "./persistence";

const product = {
  id: 1,
  title: "Test product",
  price: 179.95,
  stock: 2,
};

const createStorage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
};

describe("cart rules and persistence", () => {
  beforeEach(() => {
    globalThis.window = { localStorage: createStorage() };
  });

  it("caps quantities at stock and never decreases below one", () => {
    let state = cartReducer(undefined, addToCart(product));
    state = cartReducer(state, addToCart(product));
    state = cartReducer(state, addToCart(product));
    expect(state.items[0].quantity).toBe(2);

    state = cartReducer(state, decreaseQuantity(product.id));
    state = cartReducer(state, decreaseQuantity(product.id));
    expect(state.items[0].quantity).toBe(1);

    state = cartReducer(state, increaseQuantity(product.id));
    expect(state.items[0].quantity).toBe(2);
  });

  it("sanitizes persisted carts and preserves valid per-user carts", () => {
    const sanitized = sanitizeCartItems([
      { ...product, quantity: 9 },
      { ...product, quantity: 1 },
      { id: "invalid" },
    ]);
    expect(sanitized).toEqual([{ ...product, quantity: 2 }]);
    expect(validateCartItems(sanitized)).toBe("");
    expect(validateCartItems([])).toBe("Your cart is empty.");

    window.localStorage.setItem("loggedInUser", JSON.stringify({ email: "shopper@example.com" }));
    persistUserCart(sanitized);
    const carts = JSON.parse(window.localStorage.getItem("carts"));
    expect(carts["shopper@example.com"]).toEqual(sanitized);
  });
});
