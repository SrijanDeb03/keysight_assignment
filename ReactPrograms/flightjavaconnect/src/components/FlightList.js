import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      const res = await fetch("http://localhost:8080/flights/getAll");
      const data = await res.json();
      setFlights(data);
    } catch (error) {
      console.error("Failed to load flights:", error);
    }
  };

  const deleteFlight = async (id) => {
    try {
      await fetch(`http://localhost:8080/flights/${id}`, {
        method: "DELETE",
      });

      setFlights((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Failed to delete flight:", error);
    }
  };

  return (
    <div>
      <h3>Available Flights Below</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Airline Name</th>
            <th>Airline Code</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Seats</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {flights.length > 0 ? (
            flights.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.flightName}</td>
                <td>{f.airlineCode}</td>
                <td>{f.source}</td>
                <td>{f.destination}</td>
                <td>{f.seats}</td>
                <td>₹ {f.price}</td>
                <td>
                  <Link to={`/edit/${f.id}`}>Edit</Link>{" "}
                  <button onClick={() => deleteFlight(f.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No flights available</td>
            </tr>
          )}
        </tbody>
      </table>

      <br />
      <Link to="/add">Add New Flight</Link>
    </div>
  );
};

export default FlightList;
