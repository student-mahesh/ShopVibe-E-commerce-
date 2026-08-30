import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="card h-100">
      <img
        src={product.thumbnail}
        className="card-img-top"
        alt={product.title}
      />

      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>

        <p className="card-text">₹ {product.price}</p>

        <p className="card-text">{product.description}</p>
        <Link to={`/products/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
        <button
          className="btn btn-success"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
