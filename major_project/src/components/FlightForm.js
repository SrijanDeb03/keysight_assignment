import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import FlightService from '../api/FlightService';

const FlightForm = () => {
    const [flight, setFlight] = useState({
        flightNumber: '',
        origin: '',
        destination: '',
        departureTime: '',
        status: 'On Time'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadFlight();
        }
        // eslint-disable-next-line
    }, [id]);

    const loadFlight = async () => {
        try {
            const response = await FlightService.getFlightById(id);
            setFlight(response.data);
        } catch (error) {
            console.error("Error loading flight", error);
            setError("Failed to load flight details.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlight(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // FIX: Backend requires seconds (YYYY-MM-DDTHH:mm:ss)
            const payload = {
                ...flight,
                departureTime: flight.departureTime.length === 16 ? flight.departureTime + ':00' : flight.departureTime
            };

            if (id) {
                await FlightService.updateFlight(id, payload);
            } else {
                await FlightService.createFlight(payload);
            }
            navigate('/');
        } catch (error) {
            console.error("Error saving flight", error);
            setLoading(false);
            if (error.code === 'ERR_NETWORK') {
                setError("Network Error: Is the Backend Server Running?");
            } else {
                setError("Failed to save flight. Please check your data.");
            }
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="page-header" style={{ marginBottom: '1rem' }}>
                <div className="page-title">
                    <h2>{id ? 'Edit Flight' : 'New Flight'}</h2>
                    <p>Enter the flight details below</p>
                </div>
            </div>

            <div className="content-card glass-card">
                {error && (
                    <div style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        border: '1px solid #fecaca'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="input-group">
                        <label className="input-label">Flight Number</label>
                        <input
                            type="text"
                            name="flightNumber"
                            value={flight.flightNumber}
                            onChange={handleChange}
                            placeholder="e.g. AA 1420"
                            className="input-field"
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="input-group">
                            <label className="input-label">Origin City</label>
                            <input
                                type="text"
                                name="origin"
                                value={flight.origin}
                                onChange={handleChange}
                                placeholder="e.g. New York"
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Destination City</label>
                            <input
                                type="text"
                                name="destination"
                                value={flight.destination}
                                onChange={handleChange}
                                placeholder="e.g. London"
                                className="input-field"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Departure Time</label>
                        <input
                            type="datetime-local"
                            name="departureTime"
                            value={flight.departureTime}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Current Status</label>
                        <select
                            name="status"
                            value={flight.status}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="On Time">On Time</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ flex: 1, justifyContent: 'center' }}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (id ? 'Update Flight' : 'Save Flight')}
                        </button>
                        <Link to="/" className="btn btn-secondary">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FlightForm;
