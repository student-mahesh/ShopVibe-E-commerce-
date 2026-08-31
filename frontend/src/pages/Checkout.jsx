import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearCart } from "../redux/cartSlice";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => item.price * item.quantity,
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

    const order = {
      customer: formData,
      items: cartItems,
      totalPrice: totalPrice,
      paymentMethod: formData.paymentMethod,
      status: "PLACED",
    };
    console.log(order);
    dispatch(clearCart());
    navigate("/order-confirmation");
  };

  return (
    <>
      <div className="mb-4">
        <h3>Order Summary</h3>

        {cartItems.map((item) => (
          <div key={item.id}>
            <p>
              {item.title} × {item.quantity} = ₹ {item.price * item.quantity}
            </p>
          </div>
        ))}

        <h4>Total: ₹ {totalPrice}</h4>
      </div>
      <div className="container mt-4">
        <h2>Checkout</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              name="pincode"
              className="form-control"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Payment Method</label>

            <div>
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={formData.paymentMethod === "COD"}
                onChange={handleChange}
              />
              <label className="ms-2">Cash on Delivery</label>
            </div>

            <div>
              <input
                type="radio"
                name="paymentMethod"
                value="ONLINE"
                checked={formData.paymentMethod === "ONLINE"}
                onChange={handleChange}
              />
              <label className="ms-2">Online Payment</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Continue
          </button>
        </form>
      </div>
    </>
  );
}

export default Checkout;
