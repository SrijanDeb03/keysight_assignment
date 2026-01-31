import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Product({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product">
      <img src={product.image} alt={product.title} />

      <div>
        <h2>{product.title}</h2>
        <p><b>Price:</b> ₹{product.price}</p>
        <p>{product.description}</p>

        <button
          onClick={() => {
            addToCart(product);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
