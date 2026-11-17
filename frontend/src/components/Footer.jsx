import { Link } from "react-router";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container app-container">
        <div className="footer-grid">
          <div>
            <div className="brand-mark"><span className="brand-mark__symbol">S</span><span>ShopVibe</span></div>
            <p className="footer-copy">Browse products, save items to your cart, and place a demo order.</p>
          </div>
          <div>
            <h2>Explore</h2>
            <Link to="/">Home</Link>
            <Link to="/products">Shop all products</Link>
          </div>
          <div>
            <h2>Account</h2>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
        <p className="footer-legal">© 2026 ShopVibe</p>
      </div>
    </footer>
  );
}

export default Footer;
