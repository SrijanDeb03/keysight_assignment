import React, { useState, useMemo } from "react";
 
function Product() {
  const [price] = useState(1000);
  const [discount] = useState(20);
  const [quantity, setQuantity] = useState(1);
 
  const finalPrice = useMemo(() => {
    console.log("calculating discounted price");
    return price - (price * discount) / 100;
  }, [price, discount]);
 
  return (
    <div>
      <h2>Product price before discount : INR {price}</h2>
      <h2>Discount : {discount}%</h2>
      <h2>Final Price after discount : INR {finalPrice}</h2>
      <h2>Quantity : {quantity}</h2>
 
      <button onClick={() => setQuantity(quantity + 1)}>
        ADD PRODUCT
      </button>
    </div>
  );
}
 
export default Product;