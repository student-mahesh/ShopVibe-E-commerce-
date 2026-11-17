import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { getLoggedInUser } from "../redux/persistence";
import { formatPrice } from "../utils/formatPrice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((item) => item.id === product.id));
  const isLoggedIn = Boolean(getLoggedInUser());
  const hasDiscount = Number(product.discountPercentage) > 0;
  const handleAddToCart = () => {
    if (cartItem && cartItem.quantity >= product.stock) return toast.error(`Only ${product.stock} ${product.title} item(s) are available.`);
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart.`);
  };
  return <article className="product-card"><Link to={`/products/${product.id}`} className="product-card__image-wrap">{hasDiscount && <span className="discount-badge">{Math.round(product.discountPercentage)}% off</span>}<img src={product.thumbnail} alt={product.title} loading="lazy" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} /></Link><div className="product-card__content"><p className="product-category">{product.category.replaceAll("-", " ")}</p><h2><Link to={`/products/${product.id}`}>{product.title}</Link></h2><div className="product-meta"><span className="product-rating" aria-label={`${product.rating} out of 5 stars`}><span aria-hidden="true">★</span> {Number(product.rating).toFixed(1)}</span><span className={product.stock > 0 ? "in-stock" : "out-stock"}>{product.stock > 0 ? "In stock" : "Out of stock"}</span></div><div className="product-card__footer"><strong>{formatPrice(product.price)}</strong>{isLoggedIn ? <button className="add-button" onClick={handleAddToCart} disabled={product.stock < 1}>Add to cart</button> : <Link className="add-button text-center" to="/login">Sign in to add</Link>}</div></div></article>;
}

export default ProductCard;
