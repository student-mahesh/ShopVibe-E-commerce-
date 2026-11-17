import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { resetCart } from "../redux/cartSlice";
import { resetOrders } from "../redux/orderSlice";
import { getLoggedInUser } from "../redux/persistence";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = getLoggedInUser();

  const cartItems = useSelector((state) => state.cart.items);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://dummyjson.com/products/categories", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : [])
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const cartCounts = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    dispatch(resetCart());
    dispatch(resetOrders());

    toast.success("Logged out successfully");

    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? "is-active" : ""}`;

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
    setSearch("");
  };

  const getCategoryValue = (category) =>
    typeof category === "string" ? category : category.slug;

  const getCategoryLabel = (category) => {
    const value = getCategoryValue(category) || "";
    return typeof category === "string"
      ? value.replaceAll("-", " ")
      : category.name || value.replaceAll("-", " ");
  };

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg">
        <div className="container app-container">
          {/* ================= BRAND ================= */}

          <Link to="/" className="navbar-brand brand-mark">
            <span className="brand-mark__symbol">S</span>
            <span>ShopVibe</span>
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
            <div className="navbar-nav ms-lg-4">
              {/* HOME */}

              <NavLink to="/" end className={navClass}>
                Home
              </NavLink>

              {/* PRODUCTS */}

              <div className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle ${isShopMenuOpen ? "show" : ""}`}
                  type="button"
                  aria-expanded={isShopMenuOpen}
                  aria-controls="shop-category-menu"
                  onClick={() => setIsShopMenuOpen((isOpen) => !isOpen)}
                >
                  Shop
                </button>
                <div
                  id="shop-category-menu"
                  className={`dropdown-menu shop-category-menu ${isShopMenuOpen ? "show" : ""}`}
                >
                  <Link className="dropdown-item" to="/products" onClick={() => setIsShopMenuOpen(false)}>
                    All products
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={getCategoryValue(category)}
                      className="dropdown-item"
                      to={`/products?category=${encodeURIComponent(getCategoryValue(category))}`}
                      onClick={() => setIsShopMenuOpen(false)}
                    >
                      {getCategoryLabel(category)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <form className="header-search ms-lg-auto" onSubmit={handleSearch}>
              <label className="visually-hidden" htmlFor="header-search">Search products</label>
              <input id="header-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" />
              <button type="submit" aria-label="Search products">Search</button>
            </form>

            <div className="header-actions">
              <NavLink to="/cart" className="cart-link" aria-label={`Cart, ${cartCounts} items`}>
                Cart <span>{cartCounts}</span>
              </NavLink>
              {loggedInUser ? (
                <div className="account-menu">
                  <NavLink to="/orders" className="account-link">{loggedInUser.name || "Account"}</NavLink>
                  <button className="logout-link" onClick={handleLogout}>Log out</button>
                </div>
              ) : (
                <Link to="/login" className="account-link">Sign in</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
