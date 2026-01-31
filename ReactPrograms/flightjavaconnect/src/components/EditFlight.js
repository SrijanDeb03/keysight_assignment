import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditFlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flightName, setFlightName] = useState("");
  const [airlineCode, setAirlineCode] = useState("");
  const [seats, setSeats] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    loadSingleFlight();
  }, [id]);

  const loadSingleFlight = async () => {
    try {
      const res = await fetch(`http://localhost:8080/flights/get/${id}`);

      const data = await res.json();

      setFlightName(data.flightName || "");
      setAirlineCode(data.airlineCode || "");
      setSeats(data.seats ?? "");
      setSource(data.source || "");
      setDestination(data.destination || "");
      setPrice(data.price ?? "");
    } catch (error) {
      console.error("Failed to load flight:", error);
    }
  };

  const updateFlight = async (e) => {
    e.preventDefault();

    const flight = {
      flightName,
      airlineCode,
      seats,
      source,
      destination,
      price,
    };

    try {
      await fetch(`http://localhost:8080/flights/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flight),
      });

      navigate("/");
    } catch (error) {
      console.error("Failed to update flight:", error);
    }
  };

  return (
    <div>
      <h3>Edit Flight</h3>

      <form onSubmit={updateFlight}>
        <div>
          <label>Airline Name</label>
          <input
            type="text"
            value={flightName}
            onChange={(e) => setFlightName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Airline Code</label>
          <input
            type="text"
            value={airlineCode}
            onChange={(e) => setAirlineCode(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Seats Available</label>
          <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Source</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Ticket Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <button type="submit">Update Flight</button>
      </form>
    </div>
  );
};

export default EditFlight;
