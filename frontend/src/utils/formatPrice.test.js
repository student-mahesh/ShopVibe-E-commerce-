import { describe, expect, it } from "vitest";
import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("renders numeric values with exactly two decimal places", () => {
    expect(formatPrice(179.95000000000002)).toBe("₹179.95");
    expect(formatPrice(8)).toBe("₹8.00");
  });
});
