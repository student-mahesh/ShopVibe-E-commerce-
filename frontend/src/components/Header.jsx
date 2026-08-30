import { useSelector } from "react-redux";
import { Link } from "react-router";
function Header() {
  const cartItems = useSelector((state) => state.cart.items);

  const cartCounts = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>{" "}
        <Link to="/cart">Cart({cartCounts})</Link>
      </nav>
    </header>
  );
}
export default Header;
