import { Link } from "react-router-dom";

function Cart({ cart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart">
      <h2>Cart Page</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map(item => (
        <div key={item.id} className="cart-row">
          <img src={item.image} alt={item.title} />
          <span>{item.title}</span>
          <span>${item.price}</span>
          <span>Qty: {item.qty}</span>
        </div>
      ))}

      <div className="cart-footer">
        <Link to="/category/electronics" className="purchase-btn">
          Purchase More
        </Link>

        <h3>Total Price: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Cart;
