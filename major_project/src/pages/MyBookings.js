import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Airline name helper
    const getAirlineName = (flightNumber) => {
        const airlines = ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'GoFirst', 'AirAsia India', 'Akasa Air', 'Alliance Air'];
        const hash = flightNumber.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return airlines[hash % airlines.length];
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8080/bookings/my-bookings', {
            headers: { Authorization: user.authHeader }
        })
            .then(res => {
                setBookings(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [user, navigate]);

    if (loading) {
        return (
            <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading your bookings...</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div style={{ marginBottom: '2rem' }}>
                <h2>My Bookings</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    {bookings.length > 0
                        ? `You have ${bookings.length} booking${bookings.length > 1 ? 's' : ''}`
                        : 'No bookings yet'
                    }
                </p>
            </div>

            {bookings.length === 0 ? (
                <div className="empty-state glass-card">
                    <div className="icon">🎫</div>
                    <h3>No Bookings Yet</h3>
                    <p>Start exploring flights and book your first trip!</p>
                    <button
                        className="btn-primary"
                        style={{ marginTop: '1rem' }}
                        onClick={() => navigate('/')}
                    >
                        Browse Flights
                    </button>
                </div>
            ) : (
                <div className="bookings-grid">
                    {bookings.map(booking => (
                        <div key={booking.id} className="booking-card glass-card">
                            <div className="header">
                                <div className="flight-info">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            background: 'var(--accent-gradient)',
                                            borderRadius: 'var(--radius-sm)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1rem'
                                        }}>✈</div>
                                        <div>
                                            <h3>{getAirlineName(booking.flight.flightNumber)}</h3>
                                            <div className="route" style={{ fontSize: '0.8rem' }}>
                                                {booking.flight.flightNumber}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className={`status-badge ${booking.status === 'CONFIRMED' ? 'confirmed' : 'pending'}`}>
                                    {booking.status || 'Confirmed'}
                                </span>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '1rem',
                                background: 'var(--bg-input)',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '1rem'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{booking.flight.origin}</div>
                                </div>
                                <div style={{
                                    flex: 1,
                                    height: '2px',
                                    background: 'var(--accent-gradient)',
                                    margin: '0 1rem',
                                    position: 'relative'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        background: 'var(--bg-card)',
                                        padding: '0 0.5rem'
                                    }}>✈️</span>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{booking.flight.destination}</div>
                                </div>
                            </div>

                            <div className="details">
                                <div>
                                    <span className="label">Passenger:</span> {booking.passengerName}
                                </div>
                                <div>
                                    <span className="label">Class:</span> {booking.seatClass}
                                </div>
                                <div>
                                    <span className="label">Date:</span> {new Date(booking.flight.departureTime).toLocaleDateString()}
                                </div>
                                <div>
                                    <span className="label">Price:</span>{' '}
                                    <span style={{ color: 'var(--success)', fontWeight: '600' }}>
                                        ₹{booking.totalPrice?.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookings;
