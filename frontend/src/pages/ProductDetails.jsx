import { useState, useEffect } from "react";
import { useParams } from "react-router";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const response = fetch(`https://dummyjson.com/products/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  if (!product) {
    return <p>Loading......</p>;
  }
  return (
    <>
      <div className="container">
        <img src={product.thumbnail} alt={product.title} width="300" />

        <h2>{product.title}</h2>

        <h4>₹ {product.price}</h4>

        <p>{product.description}</p>

        <p>Category: {product.category}</p>
      </div>
    </>
  );
}
export default ProductDetails;
