import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import ProductCard from "../components/ProductCard";

const PAGE_SIZE = 12;
const categoryValue = (category) => typeof category === "string" ? category : category.slug;
const categoryLabel = (category) => {
  const value = categoryValue(category) || "";
  return typeof category === "string" ? value.replaceAll("-", " ") : category.name || value.replaceAll("-", " ");
};

function Catalogue({ initialCategory, initialSearch }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch("https://dummyjson.com/products?limit=0", { signal: controller.signal }),
      fetch("https://dummyjson.com/products/categories", { signal: controller.signal }),
    ])
      .then(async ([productsResponse, categoriesResponse]) => {
        if (!productsResponse.ok || !categoriesResponse.ok) throw new Error("Unable to load the catalogue. Please try again.");
        const [productsData, categoriesData] = await Promise.all([productsResponse.json(), categoriesResponse.json()]);
        setProducts(productsData.products || []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesCategory = !category || product.category === category;
      const searchableText = `${product.title} ${product.description} ${product.brand || ""}`.toLowerCase();
      return matchesCategory && (!normalizedSearch || searchableText.includes(normalizedSearch));
    });
    return result.sort((first, second) => {
      if (sort === "price-asc") return first.price - second.price;
      if (sort === "price-desc") return second.price - first.price;
      if (sort === "rating-desc") return second.rating - first.rating;
      if (sort === "title") return first.title.localeCompare(second.title);
      return 0;
    });
  }, [products, category, search, sort]);

  const resetFilters = () => { setCategory(""); setSearch(""); setSort("featured"); setVisibleCount(PAGE_SIZE); };
  const updateFilter = (setter) => (event) => { setter(event.target.value); setVisibleCount(PAGE_SIZE); };

  if (loading) return <div className="page-state"><div className="spinner-border" role="status" /><p>Loading the catalogue…</p></div>;
  if (error) return <div className="page-state"><h1>Catalogue unavailable</h1><p>{error}</p><button className="btn btn-dark" onClick={() => window.location.reload()}>Try again</button></div>;

  return (
    <div className="catalogue-page">
      <section className="container app-container catalogue-content">
        <div className="catalogue-controls">
          <div className="catalogue-search"><label htmlFor="catalogue-search">Search products</label><input id="catalogue-search" value={search} onChange={updateFilter(setSearch)} placeholder="Search by product or brand" /></div>
          <div><label htmlFor="catalogue-category">Category</label><select id="catalogue-category" value={category} onChange={updateFilter(setCategory)}><option value="">All categories</option>{categories.map((item) => <option key={categoryValue(item)} value={categoryValue(item)}>{categoryLabel(item)}</option>)}</select></div>
          <div><label htmlFor="catalogue-sort">Sort by</label><select id="catalogue-sort" value={sort} onChange={updateFilter(setSort)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="rating-desc">Highest rated</option><option value="title">Title: A–Z</option></select></div>
          <button className="text-button" onClick={resetFilters}>Clear filters</button>
        </div>
        <div className="catalogue-summary"><p><strong>{filteredProducts.length}</strong> products found</p><p>{category ? `Category: ${category.replaceAll("-", " ")}` : "All categories"}</p></div>
        {filteredProducts.length ? <><div className="product-grid">{filteredProducts.slice(0, visibleCount).map((product) => <ProductCard key={product.id} product={product} />)}</div>{visibleCount < filteredProducts.length && <div className="text-center pt-5"><button className="btn btn-outline-dark" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Load more products</button></div>}</> : <div className="empty-state"><h2>No products match those filters.</h2><p>Try a different search or clear the active filters.</p><button className="btn btn-dark" onClick={resetFilters}>Clear filters</button></div>}
      </section>
    </div>
  );
}

function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  return <Catalogue key={`${initialCategory}-${initialSearch}`} initialCategory={initialCategory} initialSearch={initialSearch} />;
}

export default Products;
