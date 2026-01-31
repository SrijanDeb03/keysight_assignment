
import React from "react";


function RouteInfo(props) {
  return (
    <div>
      <h3>Route Info</h3>
      <p>Source City: {props.source}</p>
      <p>Destination City: {props.destination}</p>
    </div>
  );
}

function PriceInfo(props) {
  return (
    <div>
      <h3>Price Info</h3>
      <p>Ticket Price: {props.price}</p>
    </div>
  );
}


function FlightInfo(props) {
  return (
    <div>
      <h2>Flight Info</h2>

      <p>Airline Name: {props.airlineName}</p>
      <p>Airline Code: {props.airlineCode}</p>
      <p>Seats Available: {props.seats}</p>

      <RouteInfo
        source={props.source}
        destination={props.destination}
      />

      <PriceInfo price={props.price} />
    </div>
  );
}

export default FlightInfo;
