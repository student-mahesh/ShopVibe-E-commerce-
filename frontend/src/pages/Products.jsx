import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
function Products() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const response = fetch("https://dummyjson.com/products")
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data.products);
      });
  }, []);

  return (
    <>
      <h2>Products</h2>

      <div className="container">
        <div className="row">
          {product.map((item) => (
            <div className="col-md-4 col-lg-3 mb-4" key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Products;
