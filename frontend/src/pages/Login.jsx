import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { resetCart, setCart } from "../redux/cartSlice";

import { resetOrders, setOrders } from "../redux/orderSlice";
import { loadUserCart, loadUserOrders, readStoredJson } from "../redux/persistence";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    const storedUsers = readStoredJson("users", []);
    const users = Array.isArray(storedUsers) ? storedUsers : [];

    const user = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password,
    );

    if (!user) {
      toast.error("Invalid email or password");
      return;
    }

    // Clear previous user's Redux data
    dispatch(resetCart());
    dispatch(resetOrders());

    // Set current logged-in user
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ name: user.name, email: user.email }),
    );

    // -----------------------------
    // LOAD CURRENT USER'S CART
    // -----------------------------

    dispatch(setCart(loadUserCart()));

    // -----------------------------
    // LOAD CURRENT USER'S ORDERS
    // -----------------------------

    dispatch(setOrders(loadUserOrders()));

    toast.success(`Welcome, ${user.name}!`);

    navigate("/");
  };

  return (
    <div className="container auth-page mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign in</h2>

              <p className="text-muted small text-center mb-4">
                Demo account — use a non-personal password.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              <p className="text-center mt-3">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
