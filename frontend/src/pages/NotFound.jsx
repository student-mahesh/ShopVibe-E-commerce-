import { Link } from "react-router";

function NotFound() {
  return <div className="page-state"><p className="eyebrow">404</p><h1>That page is not here.</h1><p>Return to the storefront or continue browsing the catalogue.</p><div className="d-flex justify-content-center gap-3"><Link to="/" className="btn btn-dark">Home</Link><Link to="/products" className="btn btn-outline-dark">Shop products</Link></div></div>;
}

export default NotFound;
