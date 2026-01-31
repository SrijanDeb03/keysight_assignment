import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFlight = () => {
  const navigate = useNavigate();

  const [flightName, setFlightName] = useState("");
  const [airlineCode, setAirlineCode] = useState("");
  const [seats, setSeats] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");

  const saveFlight = async (e) => {
    e.preventDefault();

    const flight = {
      flightName,
      airlineCode,
      seats,
      source,
      destination,
      price
    };

    await fetch("http://localhost:8080/flights/add/flight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flight)
    });

    navigate("/");
  };

  return (
    <div>
      <h3>Add Flight</h3>

      <form onSubmit={saveFlight}>
        <div>
          <label>Airline Name</label>
          <input value={flightName} onChange={e => setFlightName(e.target.value)} required />
        </div>

        <div>
          <label>Airline Code</label>
          <input value={airlineCode} onChange={e => setAirlineCode(e.target.value)} required />
        </div>

        <div>
          <label>Seats Available</label>
          <input type="number" value={seats} onChange={e => setSeats(e.target.value)} required />
        </div>

        <div>
          <label>Source</label>
          <input value={source} onChange={e => setSource(e.target.value)} required />
        </div>

        <div>
          <label>Destination</label>
          <input value={destination} onChange={e => setDestination(e.target.value)} required />
        </div>

        <div>
          <label>Ticket Price</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>

        <button type="submit">Save Flight</button>
      </form>
    </div>
  );
};

export default AddFlight;
