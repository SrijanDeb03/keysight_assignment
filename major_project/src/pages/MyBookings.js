import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8080/bookings/my-bookings', {
            headers: { Authorization: user.authHeader }
        })
            .then(res => setBookings(res.data))
            .catch(err => console.error(err));
    }, [user, navigate]);

    return (
        <div className="container">
            <h2>My Bookings</h2>
            <div style={{ marginTop: '2rem' }}>
                {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    bookings.map(booking => (
                        <div key={booking.id} className="card" style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Flight: {booking.flight.flightNumber}</h3>
                                <span className="status-badge status-on-time">{booking.status}</span>
                            </div>
                            <p>{booking.flight.origin} ➝ {booking.flight.destination}</p>
                            <p>Passenger: {booking.passengerName}</p>
                            <p>Class: {booking.seatClass} | Price: ₹{booking.totalPrice}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyBookings;
