import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

function FlightList() {
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Corrected URL to /api/flights
        axios.get('http://localhost:8080/api/flights')
            .then(response => {
                setFlights(response.data);
                setFilteredFlights(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching flights:', error);
                setLoading(false);
            });
    }, []);

    const [sortOption, setSortOption] = useState('priceLowHigh'); // Default sort

    const handleSearch = ({ from, to }) => {
        if (!from && !to) {
            setFilteredFlights(flights);
            return;
        }
        const filtered = flights.filter(f =>
            (from ? f.origin.toLowerCase().includes(from.toLowerCase()) : true) &&
            (to ? f.destination.toLowerCase().includes(to.toLowerCase()) : true)
        );
        setFilteredFlights(filtered);
    };

    const getSortedFlights = () => {
        let sorted = [...filteredFlights];
        if (sortOption === 'priceLowHigh') {
            sorted.sort((a, b) => a.economyPrice - b.economyPrice);
        } else if (sortOption === 'priceHighLow') {
            sorted.sort((a, b) => b.economyPrice - a.economyPrice);
        } else if (sortOption === 'departureTime') {
            sorted.sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime));
        }
        return sorted;
    };

    const sortedFlights = getSortedFlights();

    return (
        <div>
            <SearchBar onSearch={handleSearch} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Available Flights ({sortedFlights.length})</h2>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label style={{ fontWeight: 'bold' }}>Sort By:</label>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '1rem'
                        }}
                    >
                        <option value="priceLowHigh">Price: Low to High</option>
                        <option value="priceHighLow">Price: High to Low</option>
                        <option value="departureTime">Departure Time</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Loading flights...</p>
            ) : sortedFlights.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px' }}>
                    <h3>No flights found matching your search.</h3>
                    <p>Try different cities or clear the search.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {sortedFlights.map(flight => (
                        <div key={flight.id} className="flight-card glass-card">
                            {/* Airline Info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '200px' }}>
                                <div style={{ fontSize: '2rem' }}>✈️</div>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Srijan's Airlines</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{flight.flightNumber}</div>
                                </div>
                            </div>

                            {/* Route Info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1, justifyContent: 'center' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{flight.origin}</div>
                                    <div style={{ color: '#718096', fontSize: '0.9rem' }}>{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                </div>
                                <div style={{ color: '#cbd5e0', fontSize: '0.8rem' }}>2h 30m</div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{flight.destination}</div>
                                    <div style={{ color: '#718096', fontSize: '0.9rem' }}>--:--</div>
                                </div>
                            </div>

                            {/* Price & Action */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', minWidth: '250px', justifyContent: 'flex-end' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>₹{flight.economyPrice}</div>
                                    <div style={{ color: '#718096', fontSize: '0.8rem' }}>per adult</div>
                                </div>
                                <button
                                    className="btn-primary"
                                    onClick={() => navigate(`/book/${flight.id}`)}
                                >
                                    BOOK
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FlightList;
