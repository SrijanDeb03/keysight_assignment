import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]); // store products

  // function to fetch products
  const fetchProducts = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // run once when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Featured Products</h2>

      <div className="item-container">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>INR {product.price}</p>

            <NavLink to={`/product/${product.id}`}>
              View
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
