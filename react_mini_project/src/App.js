import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Product from "./Product";
import Cart from "./Cart";


function Home() {
  


return (
    <div className="home">
      <h1>ONE STOP FOR YOUR NEXT PURCHASE</h1>
      <p className="home-subtitle">
        Be satiated with our range of products on Shoppy.
        <br></br>
        Happy Shopping.
      </p>

      <div className="home-categories">
        <Link to="/category/electronics" className="home-card">
          <h3>Electronics</h3>
          
        </Link>

        <Link to="/category/clothing" className="home-card">
          <h3>Clothing</h3>
         
        </Link>
      </div>
    </div>
  );
}



function Category() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filtered =
    name === "clothing"
      ? products.filter(
          p =>
            p.category === "men's clothing" ||
            p.category === "women's clothing"
        )
      : products.filter(p => p.category === name);

  return (
    <div className="grid">
      {filtered.map(p => (
        <Link key={p.id} to={`/product/${p.id}`} className="card">
          <img src={p.image} alt={p.title} />
          <p>{p.title}</p>
        </Link>
      ))}
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(items => {
      const found = items.find(i => i.id === product.id);

      if (found) {
        return items.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...items, { ...product, qty: 1 }];
    });
  };

  return (
    <BrowserRouter>
      <nav className="nav">
        <div className="nav-logo">Shoppy</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart ({cart.length})</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>

      <footer className="footer">Footer Page</footer>
    </BrowserRouter>
  );
}

export default App;

