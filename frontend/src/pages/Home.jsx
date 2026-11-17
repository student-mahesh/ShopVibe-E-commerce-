import { useEffect, useState } from "react";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";

const categoryValue = (category) => typeof category === "string" ? category : category.slug;
const categoryLabel = (category) => {
  const value = categoryValue(category) || "";
  return typeof category === "string" ? value.replaceAll("-", " ") : category.name || value.replaceAll("-", " ");
};

function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch("https://dummyjson.com/products?limit=8", { signal: controller.signal }),
      fetch("https://dummyjson.com/products/categories", { signal: controller.signal }),
    ])
      .then(async ([productsResponse, categoriesResponse]) => {
        if (!productsResponse.ok || !categoriesResponse.ok) throw new Error("Unable to load storefront content");
        const [productsData, categoriesData] = await Promise.all([productsResponse.json(), categoriesResponse.json()]);
        setFeatured(productsData.products || []);
        setCategories(Array.isArray(categoriesData) ? categoriesData.slice(0, 6) : []);
      })
      .catch(() => {})
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  const heroImage = featured[0]?.thumbnail;

  return (
    <div className="storefront">
      <section className="home-hero">
        <div className="container app-container home-hero__grid">
          <div className="home-hero__copy"><p className="eyebrow">NEW SEASON · NEW ARRIVALS</p><h1>A little something for every day.</h1><p>Explore everyday essentials, home favourites and more.</p><div className="hero-actions"><Link to="/products" className="btn btn-dark">Explore now</Link></div></div>
          <div className="hero-image-panel">{heroImage ? <img src={heroImage} alt="Featured product" /> : <div className="hero-image-fallback">S</div>}</div>
        </div>
      </section>

      <section className="section-space"><div className="container app-container"><div className="section-heading"><div><p className="eyebrow">Categories</p><h2>Browse your way.</h2></div><Link to="/products" className="text-link">View all</Link></div><div className="category-grid">{categories.map((category, index) => <Link key={categoryValue(category)} to={`/products?category=${encodeURIComponent(categoryValue(category))}`} className={`category-card category-card--${index}`}><h3>{categoryLabel(category)}</h3></Link>)}</div>{!loading && !categories.length && <p className="text-muted">Categories are unavailable. You can still view all products.</p>}</div></section>

      <section className="featured-section"><div className="container app-container"><div className="section-heading"><div><p className="eyebrow">Featured</p><h2>Popular picks</h2></div><Link to="/products" className="text-link">Shop all</Link></div>{loading ? <div className="section-loader"><div className="spinner-border" role="status" /></div> : <div className="product-grid">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div>}</div></section>
    </div>
  );
}

export default Home;
