import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="card h-100 border-0 shadow-sm overflow-hidden">
      {/* Product Image */}
      <div
        className="bg-light d-flex align-items-center justify-content-center"
        style={{ height: "220px" }}
      >
        <img
          src={product.thumbnail}
          className="img-fluid"
          alt={product.title}
          style={{
            maxHeight: "200px",
            maxWidth: "90%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Product Information */}
      <div className="card-body d-flex flex-column">
        {/* Category */}
        <small className="text-primary text-uppercase fw-semibold mb-1">
          {product.category}
        </small>

        {/* Title */}
        <h5
          className="card-title fw-bold mb-2"
          style={{
            minHeight: "48px",
          }}
        >
          {product.title}
        </h5>

        {/* Rating */}
        <div className="mb-2">
          <span className="text-warning">★★★★★</span>

          <small className="text-muted ms-2">{product.rating}</small>
        </div>

        {/* Price */}
        <h5 className="text-dark fw-bold mb-3">₹ {product.price}</h5>

        {/* Stock */}
        <small
          className={
            product.stock > 0 ? "text-success mb-3" : "text-danger mb-3"
          }
        >
          {product.stock > 0
            ? `✓ ${product.stock} items available`
            : "Out of stock"}
        </small>

        {/* Buttons */}
        <div className="mt-auto">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline-primary w-100 mb-2"
          >
            View Details
          </Link>

          <button
            className="btn btn-primary w-100"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
