import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import { Link } from "react-router";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="card mb-3" key={item.id}>
              <div className="card-body d-flex align-items-center gap-4">
                <img src={item.thumbnail} alt={item.title} width="120" />

                <div className="flex-grow-1">
                  <h5>{item.title}</h5>
                  <p>₹ {item.price}</p>

                  <div>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      −
                    </button>

                    <span className="mx-3">{item.quantity}</span>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <strong>₹ {item.price * item.quantity}</strong>
                </div>
              </div>
            </div>
          ))}

          <div className="text-end">
            <h3>Total: ₹ {totalPrice}</h3>

            <Link to="/checkout" className="btn btn-primary">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
