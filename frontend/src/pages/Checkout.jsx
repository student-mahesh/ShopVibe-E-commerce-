import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { clearCart } from "../redux/cartSlice";
import { addOrder } from "../redux/orderSlice";
import { toast } from "react-toastify";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    /* ================= VALIDATION ================= */

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      toast.error("Please fill all delivery details");
      return;
    }

    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (formData.pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      navigate("/products");
      return;
    }

    /* ================= CREATE ORDER ================= */

    const order = {
      orderId: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),

      customer: formData,

      items: cartItems,

      totalItems: totalItems,

      totalPrice: totalPrice,

      paymentMethod: formData.paymentMethod,

      status: "PLACED",
    };

    /* ================= SAVE ORDER ================= */

    dispatch(addOrder(order));

    /* ================= CLEAR CART ================= */

    dispatch(clearCart());

    toast.success("Order placed successfully!");

    navigate("/order-confirmation");
  };

  /* ================= EMPTY CART ================= */

  if (cartItems.length === 0) {
    return (
      <div className="bg-light min-vh-100">
        <div className="container py-5">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body py-5">
              <div className="display-1 mb-3">🛒</div>

              <h2 className="fw-bold">Your Cart is Empty</h2>

              <p className="text-muted mb-4">
                Add some products before proceeding to checkout.
              </p>

              <Link to="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        {/* ================= HEADER ================= */}

        <div className="mb-4">
          <Link to="/cart" className="text-decoration-none">
            ← Back to Cart
          </Link>

          <h1 className="fw-bold mt-3 mb-1">Checkout</h1>

          <p className="text-muted">
            Complete your delivery and payment details.
          </p>
        </div>

        <div className="row g-4">
          {/* ================================================= */}
          {/* DELIVERY INFORMATION */}
          {/* ================================================= */}

          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">📦 Delivery Information</h4>

                <form onSubmit={handleSubmit}>
                  {/* Name */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>

                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      className="form-control form-control-lg"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Address */}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Delivery Address
                    </label>

                    <textarea
                      name="address"
                      className="form-control"
                      rows="3"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  {/* City + Pincode */}

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">City</label>

                      <input
                        type="text"
                        name="city"
                        className="form-control form-control-lg"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Pincode</label>

                      <input
                        type="text"
                        name="pincode"
                        className="form-control form-control-lg"
                        placeholder="6-digit pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Payment */}

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Payment Method
                    </label>

                    <div className="row g-3">
                      {/* COD */}

                      <div className="col-md-6">
                        <div
                          className={`card h-100 ${
                            formData.paymentMethod === "COD"
                              ? "border-primary"
                              : ""
                          }`}
                        >
                          <div className="card-body">
                            <div className="form-check">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="paymentMethod"
                                value="COD"
                                checked={formData.paymentMethod === "COD"}
                                onChange={handleChange}
                              />

                              <label className="form-check-label fw-semibold">
                                💵 Cash on Delivery
                              </label>
                            </div>

                            <small className="text-muted ms-4">
                              Pay when your order arrives.
                            </small>
                          </div>
                        </div>
                      </div>

                      {/* Online */}

                      <div className="col-md-6">
                        <div
                          className={`card h-100 ${
                            formData.paymentMethod === "ONLINE"
                              ? "border-primary"
                              : ""
                          }`}
                        >
                          <div className="card-body">
                            <div className="form-check">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="paymentMethod"
                                value="ONLINE"
                                checked={formData.paymentMethod === "ONLINE"}
                                onChange={handleChange}
                              />

                              <label className="form-check-label fw-semibold">
                                💳 Online Payment
                              </label>
                            </div>

                            <small className="text-muted ms-4">
                              Demo payment option.
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                  >
                    Place Order →
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* ORDER SUMMARY */}
          {/* ================================================= */}

          <div className="col-lg-5">
            <div
              className="card border-0 shadow-sm"
              style={{
                position: "sticky",
                top: "20px",
              }}
            >
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">🛍 Order Summary</h4>

                {/* Products */}

                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex align-items-center mb-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                      className="bg-light rounded p-1"
                    />

                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-1 fw-semibold">{item.title}</h6>

                      <small className="text-muted">
                        ₹ {item.price} × {item.quantity}
                      </small>
                    </div>

                    <strong>₹ {item.price * item.quantity}</strong>
                  </div>
                ))}

                <hr />

                {/* Items */}

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Total Items</span>

                  <span>{totalItems}</span>
                </div>

                {/* Subtotal */}

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>

                  <span>₹ {totalPrice}</span>
                </div>

                {/* Delivery */}

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Delivery</span>

                  <span className="text-success fw-semibold">FREE</span>
                </div>

                <hr />

                {/* Total */}

                <div className="d-flex justify-content-between">
                  <span className="fw-bold fs-5">Total</span>

                  <span className="fw-bold fs-5 text-primary">
                    ₹ {totalPrice}
                  </span>
                </div>

                <div className="alert alert-light mt-4 mb-0">
                  🔒 Your order information is stored securely in this demo
                  application.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
