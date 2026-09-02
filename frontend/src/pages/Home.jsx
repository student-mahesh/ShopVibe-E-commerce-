import { Link } from "react-router";

function Home() {
  return (
    <div className="bg-light">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-white">
        <div className="container py-5">
          <div className="row align-items-center py-4">
            {/* Left Content */}
            <div className="col-lg-7">
              <span className="badge bg-primary px-3 py-2 mb-3">
                🛍️ WELCOME TO SHOEASE
              </span>

              <h1 className="display-4 fw-bold text-dark">
                Shop Smarter.
                <br />
                <span className="text-primary">Live Better.</span>
              </h1>

              <p className="lead text-muted mt-3 mb-4">
                Discover quality products, great prices, and a simple shopping
                experience — all in one place.
              </p>

              <Link to="/products" className="btn btn-primary btn-lg px-4 me-2">
                Shop Products →
              </Link>

              <Link to="/products" className="btn btn-outline-dark btn-lg px-4">
                Explore Store
              </Link>
            </div>

            {/* Right Visual */}
            <div className="col-lg-5 mt-5 mt-lg-0">
              <div className="bg-primary rounded-4 text-white p-5 text-center shadow">
                <div className="display-1 mb-3">🛍️</div>

                <h2 className="fw-bold">Easy Shopping</h2>

                <p className="mb-0">Browse → Cart → Checkout → Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Shop With Confidence</h2>

            <p className="text-muted">
              Everything you need for a smooth shopping experience.
            </p>
          </div>

          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="display-5 mb-3">🚚</div>

                  <h5 className="fw-bold">Fast Delivery</h5>

                  <p className="text-muted mb-0">
                    Get your products delivered quickly and conveniently.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="display-5 mb-3">🔒</div>

                  <h5 className="fw-bold">Secure Shopping</h5>

                  <p className="text-muted mb-0">
                    Your account and shopping experience are kept organized and
                    protected.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="display-5 mb-3">💳</div>

                  <h5 className="fw-bold">Easy Checkout</h5>

                  <p className="text-muted mb-0">
                    Add products to your cart and place your order with a simple
                    checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STORE CATEGORIES ================= */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Explore Our Store</h2>

            <p className="text-muted">Find products for your everyday needs.</p>
          </div>

          <div className="row g-4">
            {/* Electronics */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="fs-1 mb-3">📱</div>

                  <h4 className="fw-bold">Electronics</h4>

                  <p className="text-muted">
                    Discover phones, laptops and other electronic products.
                  </p>

                  <Link
                    to="/products"
                    className="text-primary text-decoration-none fw-semibold"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            </div>

            {/* Fashion */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="fs-1 mb-3">👕</div>

                  <h4 className="fw-bold">Fashion</h4>

                  <p className="text-muted">
                    Find clothing, shoes and accessories for your style.
                  </p>

                  <Link
                    to="/products"
                    className="text-primary text-decoration-none fw-semibold"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            </div>

            {/* Lifestyle */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="fs-1 mb-3">🏠</div>

                  <h4 className="fw-bold">Lifestyle</h4>

                  <p className="text-muted">
                    Explore products for your home and everyday lifestyle.
                  </p>

                  <Link
                    to="/products"
                    className="text-primary text-decoration-none fw-semibold"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">How It Works</h2>

            <p className="text-muted">Shopping is simple.</p>
          </div>

          <div className="row text-center g-4">
            <div className="col-md-3">
              <div className="fs-1">🔎</div>

              <h5 className="fw-bold mt-3">1. Browse</h5>

              <p className="text-muted">Explore our products.</p>
            </div>

            <div className="col-md-3">
              <div className="fs-1">🛒</div>

              <h5 className="fw-bold mt-3">2. Add to Cart</h5>

              <p className="text-muted">Select the products you want.</p>
            </div>

            <div className="col-md-3">
              <div className="fs-1">💳</div>

              <h5 className="fw-bold mt-3">3. Checkout</h5>

              <p className="text-muted">Enter your delivery details.</p>
            </div>

            <div className="col-md-3">
              <div className="fs-1">📦</div>

              <h5 className="fw-bold mt-3">4. Get Your Order</h5>

              <p className="text-muted">Your order is placed successfully.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-5">
        <div className="container">
          <div className="bg-dark text-white rounded-4 p-5 text-center">
            <h2 className="fw-bold">Ready to Start Shopping?</h2>

            <p className="text-light mt-3">
              Explore our products and find something you love.
            </p>

            <Link to="/products" className="btn btn-primary btn-lg px-5 mt-2">
              Start Shopping →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
