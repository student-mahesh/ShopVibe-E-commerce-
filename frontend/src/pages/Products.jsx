import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router";

function Products() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    const timer = setTimeout(() => {
      const url = search
        ? `https://dummyjson.com/products/search?q=${search}`
        : "https://dummyjson.com/products";

      fetch(url)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Failed to load products");
          }

          return resp.json();
        })
        .then((data) => {
          setProduct(data.products);
        })
        .catch((error) => {
          setError(error.message);
          setProduct([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="bg-light min-vh-100">
      {/* ================= PAGE HEADER ================= */}
      <section className="bg-white border-bottom">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h1 className="fw-bold mb-1">Explore Products</h1>

              <p className="text-muted mb-0">
                Find the products you need at great prices.
              </p>
            </div>

            <div className="col-md-5 text-md-end mt-3 mt-md-0">
              <Link to="/" className="btn btn-outline-primary">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEARCH ================= */}
      <section className="container py-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <label className="form-label fw-semibold">
                  Search Products
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-white">🔎</span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for phones, laptops, watches..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  {search && (
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setSearch("")}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="col-md-4 mt-3 mt-md-0 text-md-end">
                {!loading && !error && (
                  <span className="text-muted">
                    <strong>{product.length}</strong> products found
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="container pb-5">
        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <p className="text-muted mt-3">Loading products...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="alert alert-danger text-center" role="alert">
            <h5 className="alert-heading">Something went wrong</h5>

            <p className="mb-0">{error}</p>
          </div>
        )}

        {/* No Products */}
        {!loading && !error && product.length === 0 && (
          <div className="text-center py-5">
            <div className="display-3">🔎</div>

            <h4 className="mt-3">No products found</h4>

            <p className="text-muted">
              Try searching with a different product name.
            </p>

            <button className="btn btn-primary" onClick={() => setSearch("")}>
              Show All Products
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && product.length > 0 && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold mb-1">All Products</h3>

                <p className="text-muted mb-0">
                  Choose a product to view more details.
                </p>
              </div>
            </div>

            <div className="row g-4">
              {product.map((item) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  key={item.id}
                >
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Products;
