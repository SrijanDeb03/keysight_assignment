import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

function FlightList() {
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Filter States
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [selectedClass, setSelectedClass] = useState('all');
    const [sortOption, setSortOption] = useState('priceLowHigh');

    // Airline list for dynamic filtering
    const airlines = [
        'Air India',
        'IndiGo',
        'SpiceJet',
        'Vistara',
        'GoFirst',
        'AirAsia India',
        'Akasa Air',
        'Alliance Air'
    ];

    const timeSlots = [
        { id: 'morning', label: 'Morning', range: '6AM - 12PM' },
        { id: 'afternoon', label: 'Afternoon', range: '12PM - 6PM' },
        { id: 'evening', label: 'Evening', range: '6PM - 12AM' }
    ];

    useEffect(() => {
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

    // Get airline name from flight number
    const getAirlineName = (flightNumber) => {
        const hash = flightNumber.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return airlines[hash % airlines.length];
    };

    // Get time slot from departure time
    const getTimeSlot = (departureTime) => {
        const hour = new Date(departureTime).getHours();
        if (hour >= 6 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 18) return 'afternoon';
        return 'evening';
    };

    // Apply all filters
    useEffect(() => {
        let result = [...flights];

        // Search filter (handled by SearchBar)
        // Airline filter
        if (selectedAirlines.length > 0) {
            result = result.filter(f => selectedAirlines.includes(getAirlineName(f.flightNumber)));
        }

        // Price filter
        if (priceRange.min) {
            result = result.filter(f => f.economyPrice >= Number(priceRange.min));
        }
        if (priceRange.max) {
            result = result.filter(f => f.economyPrice <= Number(priceRange.max));
        }

        // Time filter
        if (selectedTimes.length > 0) {
            result = result.filter(f => selectedTimes.includes(getTimeSlot(f.departureTime)));
        }

        // Class filter (based on seat availability)
        if (selectedClass === 'economy') {
            result = result.filter(f => f.economySeats > 0);
        } else if (selectedClass === 'premium') {
            result = result.filter(f => f.premiumSeats > 0);
        }

        setFilteredFlights(result);
    }, [flights, selectedAirlines, priceRange, selectedTimes, selectedClass]);

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

    const toggleAirline = (airline) => {
        setSelectedAirlines(prev =>
            prev.includes(airline)
                ? prev.filter(a => a !== airline)
                : [...prev, airline]
        );
    };

    const toggleTime = (timeId) => {
        setSelectedTimes(prev =>
            prev.includes(timeId)
                ? prev.filter(t => t !== timeId)
                : [...prev, timeId]
        );
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

    const clearFilters = () => {
        setSelectedAirlines([]);
        setPriceRange({ min: '', max: '' });
        setSelectedTimes([]);
        setSelectedClass('all');
    };

    const getAirlineCount = (airline) => {
        return flights.filter(f => getAirlineName(f.flightNumber) === airline).length;
    };

    if (loading) {
        return (
            <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading flights...</p>
            </div>
        );
    }

    return (
        <div>
            <SearchBar onSearch={handleSearch} />

            <div className="page-layout">
                {/* Filter Sidebar */}
                <aside className="filter-sidebar glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', margin: 0 }}>Filters</h3>
                        <button
                            onClick={clearFilters}
                            style={{
                                color: 'var(--primary)',
                                fontSize: '0.8rem',
                                fontWeight: '500'
                            }}
                        >
                            Clear All
                        </button>
                    </div>

                    {/* Airlines Filter */}
                    <div className="filter-section">
                        <div className="filter-title">Airlines</div>
                        {airlines.map(airline => (
                            <div
                                key={airline}
                                className="filter-option"
                                onClick={() => toggleAirline(airline)}
                            >
                                <div className={`filter-checkbox ${selectedAirlines.includes(airline) ? 'checked' : ''}`}></div>
                                <span className="filter-label">{airline}</span>
                                <span className="filter-count">{getAirlineCount(airline)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Price Range Filter */}
                    <div className="filter-section">
                        <div className="filter-title">Price Range</div>
                        <div className="price-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                            />
                            <span>-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Departure Time Filter */}
                    <div className="filter-section">
                        <div className="filter-title">Departure Time</div>
                        {timeSlots.map(slot => (
                            <div
                                key={slot.id}
                                className="filter-option"
                                onClick={() => toggleTime(slot.id)}
                            >
                                <div className={`filter-checkbox ${selectedTimes.includes(slot.id) ? 'checked' : ''}`}></div>
                                <div>
                                    <span className="filter-label">{slot.label}</span>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{slot.range}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Class Filter */}
                    <div className="filter-section">
                        <div className="filter-title">Seat Class</div>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            style={{ marginTop: '0.5rem' }}
                        >
                            <option value="all">All Classes</option>
                            <option value="economy">Economy Available</option>
                            <option value="premium">Premium Available</option>
                        </select>
                    </div>
                </aside>

                {/* Main Content */}
                <main>
                    <div className="results-header">
                        <div className="results-count">
                            <span>{sortedFlights.length}</span> flights found
                        </div>
                        <div className="sort-select">
                            <label>Sort by:</label>
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="priceLowHigh">Price: Low to High</option>
                                <option value="priceHighLow">Price: High to Low</option>
                                <option value="departureTime">Departure Time</option>
                            </select>
                        </div>
                    </div>

                    {sortedFlights.length === 0 ? (
                        <div className="empty-state glass-card">
                            <div className="icon">✈️</div>
                            <h3>No flights found</h3>
                            <p>Try adjusting your filters or search for different cities.</p>
                        </div>
                    ) : (
                        <div>
                            {sortedFlights.map(flight => (
                                <div key={flight.id} className="flight-card glass-card">
                                    {/* Airline Info */}
                                    <div className="airline-info">
                                        <div className="airline-logo">✈</div>
                                        <div>
                                            <div className="airline-name">{getAirlineName(flight.flightNumber)}</div>
                                            <div className="flight-number">{flight.flightNumber}</div>
                                        </div>
                                    </div>

                                    {/* Route Info */}
                                    <div className="route-info">
                                        <div className="city">
                                            <div className="city-name">{flight.origin}</div>
                                            <div className="city-time">
                                                {new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                        <div className="duration">
                                            <div className="duration-text">2h 30m</div>
                                            <div className="duration-line"></div>
                                            <div className="duration-text">Non-stop</div>
                                        </div>
                                        <div className="city">
                                            <div className="city-name">{flight.destination}</div>
                                            <div className="city-time">--:--</div>
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="price-section">
                                        <div className="price">
                                            <div className="price-amount">₹{flight.economyPrice.toLocaleString()}</div>
                                            <div className="price-label">per adult</div>
                                        </div>
                                        <button
                                            className="btn-primary"
                                            onClick={() => navigate(`/book/${flight.id}`)}
                                        >
                                            BOOK NOW
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default FlightList;
