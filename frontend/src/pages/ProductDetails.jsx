import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import { getLoggedInUser } from "../redux/persistence";
import { formatPrice } from "../utils/formatPrice";

function ProductDetails() {
  const { id } = useParams();

  return <ProductDetailsContent key={id} id={id} />;
}

function ProductDetailsContent({ id }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((item) => item.id === Number(id)));
  const isLoggedIn = Boolean(getLoggedInUser());
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://dummyjson.com/products/${id}`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error(response.status === 404 ? "This product could not be found." : "Unable to load this product."); return response.json(); })
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.images?.[0] || data.thumbnail);
        return fetch(`https://dummyjson.com/products/category/${data.category}?limit=5`, { signal: controller.signal })
          .then((response) => response.ok ? response.json() : { products: [] })
          .then((relatedData) => setRelated((relatedData.products || []).filter((item) => item.id !== Number(id)).slice(0, 4)))
          .catch(() => setRelated([]));
      })
      .catch((requestError) => { if (requestError.name !== "AbortError") setError(requestError.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id]);

  const handleAddToCart = () => {
    const alreadyInCart = cartItem?.quantity || 0;
    if (alreadyInCart + quantity > product.stock) return toast.error(`Only ${product.stock} ${product.title} item(s) are available.`);
    Array.from({ length: quantity }).forEach(() => dispatch(addToCart(product)));
    toast.success(`${quantity} ${product.title} item${quantity > 1 ? "s" : ""} added to cart.`);
  };

  if (loading) return <div className="page-state"><div className="spinner-border" role="status" /><p>Loading product details…</p></div>;
  if (error || !product) return <div className="page-state"><h1>Product unavailable</h1><p>{error || "This product is not available."}</p><Link to="/products" className="btn btn-dark">Back to products</Link></div>;

  const images = product.images?.length ? product.images : [product.thumbnail];
  const hasDiscount = Number(product.discountPercentage) > 0;
  return <div className="product-detail-page"><div className="container app-container"><Link to="/products" className="back-link">Back to products</Link><section className="product-detail"><div className="product-gallery"><div className="product-gallery__main"><img src={selectedImage} alt={product.title} /></div>{images.length > 1 && <div className="product-gallery__thumbs">{images.map((image) => <button key={image} className={image === selectedImage ? "is-selected" : ""} onClick={() => setSelectedImage(image)}><img src={image} alt="" /></button>)}</div>}</div><div className="product-detail__content"><p className="product-category">{product.category.replaceAll("-", " ")}</p><h1>{product.title}</h1>{product.brand && <p className="product-brand">By {product.brand}</p>}<p className="detail-rating"><span>★</span> {Number(product.rating).toFixed(1)} {Array.isArray(product.reviews) && ` · ${product.reviews.length} reviews`}</p><div className="detail-price"><strong>{formatPrice(product.price)}</strong>{hasDiscount && <span>{Math.round(product.discountPercentage)}% off</span>}</div><p className="product-description">{product.description}</p><div className="detail-facts"><span>{product.stock > 0 ? `${product.stock} available` : "Out of stock"}</span></div><div className="purchase-row"><div className="quantity-selector"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity === 1} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))} disabled={quantity >= product.stock} aria-label="Increase quantity">+</button></div>{isLoggedIn ? <button className="btn btn-dark" onClick={handleAddToCart} disabled={product.stock < 1}>Add to cart</button> : <Link className="btn btn-dark" to="/login">Sign in to add</Link>}</div></div></section>{related.length > 0 && <section className="related-section"><div className="section-heading"><div><p className="eyebrow">Related</p><h2>You may also like</h2></div></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}</div></div>;
}

export default ProductDetails;
