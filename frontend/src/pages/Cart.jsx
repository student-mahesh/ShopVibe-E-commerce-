import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import { Link } from "react-router";
import Swal from "sweetalert2";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleRemove = (id, title) => {
    Swal.fire({
      title: "Remove product?",
      text: `"${title}" will be removed from your cart.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));

        Swal.fire({
          title: "Removed!",
          text: "Product removed from your cart.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  /* ================= EMPTY CART ================= */

  if (cartItems.length === 0) {
    return (
      <div className="bg-light min-vh-100">
        <div className="container py-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <div className="display-1 mb-3">🛒</div>

              <h2 className="fw-bold">Your Cart is Empty</h2>

              <p className="text-muted mb-4">
                Looks like you haven't added anything to your cart yet.
              </p>

              <Link to="/products" className="btn btn-primary btn-lg px-4">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= CART ================= */

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold mb-1">Shopping Cart</h1>

            <p className="text-muted mb-0">
              {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <Link to="/products" className="btn btn-outline-primary">
            ← Continue Shopping
          </Link>
        </div>

        <div className="row g-4">
          {/* ================= CART ITEMS ================= */}

          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div className="card border-0 shadow-sm mb-3" key={item.id}>
                <div className="card-body p-3 p-md-4">
                  <div className="row align-items-center g-3">
                    {/* Image */}

                    <div className="col-4 col-md-2">
                      <div
                        className="bg-light rounded d-flex align-items-center justify-content-center"
                        style={{ height: "120px" }}
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="img-fluid"
                          style={{
                            maxHeight: "110px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </div>

                    {/* Product */}

                    <div className="col-8 col-md-4">
                      <h5 className="fw-bold mb-2">{item.title}</h5>

                      <p className="text-muted mb-1">₹ {item.price} each</p>

                      <p className="fw-bold text-primary mb-0">
                        Subtotal: ₹ {item.price * item.quantity}
                      </p>
                    </div>

                    {/* Quantity */}

                    <div className="col-6 col-md-3">
                      <small className="text-muted d-block mb-2">
                        Quantity
                      </small>

                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          −
                        </button>

                        <span
                          className="fw-bold px-3"
                          style={{ minWidth: "45px", textAlign: "center" }}
                        >
                          {item.quantity}
                        </span>

                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove */}

                    <div className="col-6 col-md-3 text-md-end">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleRemove(item.id, item.title)}
                      >
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= ORDER SUMMARY ================= */}

          <div className="col-lg-4">
            <div
              className="card border-0 shadow-sm"
              style={{
                position: "sticky",
                top: "20px",
              }}
            >
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Order Summary</h4>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Items</span>

                  <span>{totalItems}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Subtotal</span>

                  <span>₹ {totalPrice}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Delivery</span>

                  <span className="text-success">FREE</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5">Total</span>

                  <span className="fw-bold fs-5 text-primary">
                    ₹ {totalPrice}
                  </span>
                </div>

                <Link to="/checkout" className="btn btn-primary btn-lg w-100">
                  Proceed to Checkout →
                </Link>

                <div className="text-center mt-3">
                  <small className="text-muted">🔒 Secure checkout</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
