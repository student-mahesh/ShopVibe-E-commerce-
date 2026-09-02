import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`https://dummyjson.com/products/${id}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Product not found");
        }

        return resp.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <p className="text-muted mt-3">Loading product details...</p>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <h4>Product Not Found</h4>

          <p className="mb-3">{error}</p>

          <Link to="/products" className="btn btn-primary">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  /* ================= PRODUCT DETAILS ================= */

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        {/* Back Button */}
        <div className="mb-4">
          <Link to="/products" className="text-decoration-none">
            ← Back to Products
          </Link>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">
            <div className="row g-5 align-items-center">
              {/* ================= IMAGE ================= */}

              <div className="col-lg-6">
                <div
                  className="bg-light rounded-4 d-flex align-items-center justify-content-center"
                  style={{ minHeight: "450px" }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="img-fluid"
                    style={{
                      maxHeight: "400px",
                      maxWidth: "90%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>

              {/* ================= INFORMATION ================= */}

              <div className="col-lg-6">
                {/* Category */}

                <span className="badge bg-primary mb-3 text-uppercase">
                  {product.category}
                </span>

                {/* Title */}

                <h1 className="fw-bold display-6 mb-3">{product.title}</h1>

                {/* Rating */}

                <div className="mb-3">
                  <span className="text-warning fs-5">★★★★★</span>

                  <span className="text-muted ms-2">{product.rating} / 5</span>
                </div>

                {/* Price */}

                <h2 className="fw-bold text-primary mb-4">₹ {product.price}</h2>

                {/* Description */}

                <p className="text-muted lead">{product.description}</p>

                <hr />

                {/* Product Information */}

                <div className="row mb-4">
                  <div className="col-6 mb-3">
                    <small className="text-muted d-block">Brand</small>

                    <strong>{product.brand || "Available"}</strong>
                  </div>

                  <div className="col-6 mb-3">
                    <small className="text-muted d-block">Stock</small>

                    <strong className="text-success">
                      {product.stock} available
                    </strong>
                  </div>

                  <div className="col-6">
                    <small className="text-muted d-block">Discount</small>

                    <strong>{product.discountPercentage}%</strong>
                  </div>

                  <div className="col-6">
                    <small className="text-muted d-block">Availability</small>

                    <strong className="text-success">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </div>
                </div>

                {/* Add To Cart */}

                <button
                  className="btn btn-primary btn-lg w-100"
                  disabled={product.stock === 0}
                  onClick={() => {
                    dispatch(addToCart(product));

                    toast.success(`${product.title} added to cart!`);
                  }}
                >
                  🛒 Add to Cart
                </button>

                {/* Extra Information */}

                <div className="row mt-4 text-center">
                  <div className="col-4">
                    <div className="fs-4">🚚</div>

                    <small className="text-muted">Fast Delivery</small>
                  </div>

                  <div className="col-4">
                    <div className="fs-4">🔒</div>

                    <small className="text-muted">Secure</small>
                  </div>

                  <div className="col-4">
                    <div className="fs-4">↩️</div>

                    <small className="text-muted">Easy Returns</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
