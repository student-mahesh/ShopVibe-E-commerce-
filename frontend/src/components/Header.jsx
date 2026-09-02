import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router";

import { toast } from "react-toastify";

import { resetCart } from "../redux/cartSlice";
import { resetOrders } from "../redux/orderSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const cartItems = useSelector((state) => state.cart.items);

  const cartCounts = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleLogout = () => {
    // Clear Redux state only.
    // User cart and orders remain safely stored
    // in localStorage for that user.
    dispatch(resetCart());
    dispatch(resetOrders());

    localStorage.removeItem("loggedInUser");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `nav-link px-3 ${isActive ? "fw-bold text-primary" : "text-dark"}`;

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm border-bottom">
        <div className="container">
          {/* ================= BRAND ================= */}

          <Link to="/" className="navbar-brand fw-bold text-primary fs-4">
            🛒 ShopCart
          </Link>

          {/* ================= MOBILE BUTTON ================= */}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* ================= NAVIGATION ================= */}

          <div className="collapse navbar-collapse" id="mainNavbar">
            <div className="navbar-nav ms-auto align-items-lg-center">
              {/* HOME */}

              <NavLink to="/" end className={navClass}>
                🏠 Home
              </NavLink>

              {/* PRODUCTS */}

              <NavLink to="/products" className={navClass}>
                🛍 Products
              </NavLink>

              {/* CART */}

              <NavLink to="/cart" className={navClass}>
                🛒 Cart
                <span className="badge bg-primary ms-1">{cartCounts}</span>
              </NavLink>

              {/* ORDERS */}

              <NavLink to="/orders" className={navClass}>
                📦 My Orders
              </NavLink>

              {/* ================= USER ================= */}

              {loggedInUser ? (
                <div className="d-flex align-items-center ms-lg-3 mt-2 mt-lg-0">
                  <span className="me-3 fw-semibold text-dark">
                    👋 {loggedInUser.name}
                  </span>

                  <button
                    className="btn btn-outline-danger btn-sm px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2 ms-lg-3 mt-2 mt-lg-0">
                  <Link to="/login" className="btn btn-primary btn-sm px-3">
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="btn btn-outline-primary btn-sm px-3"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
