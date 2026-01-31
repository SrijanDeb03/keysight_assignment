import React from "react";
 
const ProductContext = React.createContext();
 
class PriceComp extends React.Component {
  render() {
    return (
      <ProductContext.Provider value={{ prodPrice: 4000 }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
 
class DiscountComp extends React.Component {
  render() {
    return (
      <ProductContext.Consumer>
        {(priceData) => (
          <ProductContext.Provider
            value={{
              prodPrice: priceData.prodPrice,
              discount: 30,
            }}
          >
            {this.props.children}
          </ProductContext.Provider>
        )}
      </ProductContext.Consumer>
    );
  }
}
 
class AppComp extends React.Component {
  render() {
    return (
      <ProductContext.Consumer>
        {(data) => {
          const discountAmount = (data.prodPrice * data.discount) / 100;
          const discountedPrice = data.prodPrice - discountAmount;
 
          return (
            <div style={{ border: "1px solid black", padding: "10px" }}>
              <h3>Actual Price : {data.prodPrice}</h3>
              <h3>Discount Given : {data.discount}%</h3>
              <h3>Discounted Price : {discountedPrice}</h3>
            </div>
          );
        }}
      </ProductContext.Consumer>
    );
  }
}
 
class Product extends React.Component {
  render() {
    return (
      <div>
        <h2>Product Details</h2>
        <PriceComp>
          <DiscountComp>
            <AppComp />
          </DiscountComp>
        </PriceComp>
      </div>
    );
  }
}
 
export default Product;
 