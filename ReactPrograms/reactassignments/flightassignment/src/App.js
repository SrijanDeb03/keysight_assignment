


import React from "react";
import FlightInfo from "./FlightDetails";

function App() {
  const flight = {
    airlineName: "IndiGo",
    airlineCode: "6E",
    seats: 180,
    source: "Kolkata",
    destination: "Delhi",
    price: 5500
  };

  return (
    <div>
      <h1>Single Flight Details</h1>

      <FlightInfo
        airlineName={flight.airlineName}
        airlineCode={flight.airlineCode}
        seats={flight.seats}
        source={flight.source}
        destination={flight.destination}
        price={flight.price}
      />
    </div>
  );
}

export default App;
