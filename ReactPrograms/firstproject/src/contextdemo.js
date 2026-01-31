import React from "react";
 
// let NumberContext = React.createContext(); // context object
 
// function App() {  // Producer
//   return (
//     <NumberContext.Provider value={45}>
//       <Display />
//     </NumberContext.Provider>
//   );
// }
 
// function Display() { // Consumer
//   return (
//     <NumberContext.Consumer>
//       {value => (
//         <div>The value coming from parent comp is {value}</div>
//       )}
//     </NumberContext.Consumer>
//   );
// }
 
// export default App;
 
 
 
// Creating Context with default values
 
 
let Price = React.createContext({ val1: 2000, discount: 0 });
let Plan = React.createContext("Basic");
 
function App() {
  return (
    <div>
      {/* Cart + Dashboard with BASIC plan */}
      <Price.Provider value={{ val1: 3500, discount: 20 }}>
        <Cart />
        <Dashboard />
      </Price.Provider>
 
      {/* Cart with GOLD plan */}
      <Price.Provider value={{ val1: 3500, discount: 20 }}>
        <Plan.Provider value={"Gold"}>
          <Cart />
        </Plan.Provider>
      </Price.Provider>
 
      {/* Default values */}
      <ProductPage />
    </div>
  );
}
 
function Cart() {
  return (
    <div>
      <Price.Consumer>
        {(price) => (
          <div>
            The price in cart comp is {price.val1} and discount offered is {price.discount}
          </div>
        )}
      </Price.Consumer>
 
      <Plan.Consumer>
        {(plan) => (
          <div>The plan in cart comp is {plan}</div>
        )}
      </Plan.Consumer>
    </div>
  );
}
 
function Dashboard() {
  return (
    <div>
      <Price.Consumer>
        {(price) => (
          <div>The price in dashboard comp is {price.val1}</div>
        )}
      </Price.Consumer>
 
      <Plan.Consumer>
        {(plan) => (
          <div>The plan in dashboard comp is {plan}</div>
        )}
      </Plan.Consumer>
    </div>
  );
}
 
function ProductPage() {
  return (
    <div>
      <Price.Consumer>
        {(price) => (
          <div>The price in product page comp is {price.val1}</div>
        )}
      </Price.Consumer>
 
      <Plan.Consumer>
        {(plan) => (
          <div>The plan in product page comp is {plan}</div>
        )}
      </Plan.Consumer>
    </div>
  );
}
 
export default App;
 