const getStorage = () => {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
};

export const readStoredJson = (key, fallback) => {
  try {
    const value = getStorage()?.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const readStoredRecord = (key) => {
  const value = readStoredJson(key, {});
  return value && typeof value === "object" && !Array.isArray(value)
    ? value
    : {};
};

const writeStoredJson = (key, value) => {
  try {
    getStorage()?.setItem(key, JSON.stringify(value));
  } catch {
    // Demo persistence is optional when browser storage is unavailable.
  }
};

export const getLoggedInUser = () => {
  const user = readStoredJson("loggedInUser", null);

  return user && typeof user.email === "string" && user.email
    ? { email: user.email, name: typeof user.name === "string" ? user.name : "" }
    : null;
};

export const sanitizeCartItems = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.reduce((validItems, item) => {
    if (!item || !Number.isInteger(item.id) || typeof item.title !== "string") {
      return validItems;
    }

    const stock = Math.floor(Number(item.stock));
    const quantity = Math.floor(Number(item.quantity));
    const price = Number(item.price);

    if (
      !Number.isInteger(stock) ||
      stock < 1 ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return validItems;
    }

    if (validItems.some((validItem) => validItem.id === item.id)) {
      return validItems;
    }

    validItems.push({
      ...item,
      stock,
      price,
      quantity: Math.min(quantity, stock),
    });

    return validItems;
  }, []);
};

export const validateCartItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return "Your cart is empty.";
  }

  const isValid = items.every(
    (item) =>
      item &&
      Number.isInteger(item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity >= 1 &&
      Number.isInteger(item.stock) &&
      item.stock >= item.quantity &&
      Number.isFinite(item.price) &&
      item.price >= 0,
  );

  return isValid ? "" : "Your cart contains an invalid or unavailable item.";
};

export const loadUserCart = () => {
  const user = getLoggedInUser();
  if (!user) return [];

  return sanitizeCartItems(readStoredRecord("carts")[user.email]);
};

export const loadUserOrders = () => {
  const user = getLoggedInUser();
  if (!user) return [];

  const orders = readStoredRecord("orders")[user.email];
  return Array.isArray(orders) ? orders.filter((order) => order && typeof order === "object") : [];
};

export const persistUserCart = (items) => {
  const user = getLoggedInUser();
  if (!user) return;

  const carts = readStoredRecord("carts");
  carts[user.email] = sanitizeCartItems(items);
  writeStoredJson("carts", carts);
};

export const persistUserOrders = (orders) => {
  const user = getLoggedInUser();
  if (!user) return;

  const storedOrders = readStoredRecord("orders");
  storedOrders[user.email] = Array.isArray(orders) ? orders : [];
  writeStoredJson("orders", storedOrders);
};
