import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function BookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [flight, setFlight] = useState(null);
    const [bookingData, setBookingData] = useState({
        passengerName: '',
        age: '',
        gender: 'Male',
        aadharNumber: '',
        seatClass: 'Economy',
        coupon: ''
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState('');

    // Airline name helper
    const getAirlineName = (flightNumber) => {
        const airlines = ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'GoFirst', 'AirAsia India', 'Akasa Air', 'Alliance Air'];
        const hash = flightNumber.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return airlines[hash % airlines.length];
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/flights/${id}`)
            .then(res => {
                setFlight(res.data);
                setTotalPrice(res.data.economyPrice);
            })
            .catch(err => console.error(err));
    }, [id]);

    const applyCoupon = () => {
        const code = bookingData.coupon ? bookingData.coupon.toUpperCase().trim() : '';
        setDiscount(0);
        setCouponMessage('');

        if (code === 'KEYSIGHT') {
            const disc = Math.round(totalPrice * 0.20);
            setDiscount(disc);
            setCouponMessage('🎉 20% Keysight Employee Discount Applied!');
        } else if (code === 'FLYHIGH') {
            setDiscount(500);
            setCouponMessage('✨ Flat ₹500 Off Applied!');
        } else if (code === 'FIRST10') {
            const disc = Math.round(totalPrice * 0.10);
            setDiscount(disc);
            setCouponMessage('🎁 10% First Booking Discount!');
        } else if (code !== '') {
            setCouponMessage('❌ Invalid coupon code');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({ ...prev, [name]: value }));

        if (name === 'seatClass' && flight) {
            const newPrice = value === 'Economy' ? flight.economyPrice : flight.premiumPrice;
            setTotalPrice(newPrice);
            setDiscount(0);
            setCouponMessage('');
        }
    };

    const handleProceed = () => {
        if (!bookingData.passengerName || !bookingData.age || !bookingData.aadharNumber) {
            alert("Please fill all required details");
            return;
        }
        navigate('/payment', {
            state: {
                booking: {
                    ...bookingData,
                    flight: { id: flight.id },
                    totalPrice: totalPrice - discount,
                    user: user ? { username: user.username } : null
                }
            }
        });
    };

    if (!flight) {
        return (
            <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading flight details...</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="booking-layout">
                {/* Left: Flight Summary */}
                <aside className="flight-summary-card glass-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                        FLIGHT SUMMARY
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            background: 'var(--accent-gradient)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem'
                        }}>✈</div>
                        <div>
                            <div style={{ fontWeight: '600' }}>{getAirlineName(flight.flightNumber)}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{flight.flightNumber}</div>
                        </div>
                    </div>

                    <div className="flight-route" style={{ marginBottom: '1.5rem' }}>
                        <div className="city">
                            <h4>{flight.origin}</h4>
                            <p>{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="arrow"></div>
                        <div className="city">
                            <h4>{flight.destination}</h4>
                            <p>--:--</p>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                        padding: '1rem',
                        background: 'var(--bg-input)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1rem'
                    }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>DATE</div>
                            <div style={{ fontWeight: '500' }}>{new Date(flight.departureTime).toLocaleDateString()}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>DURATION</div>
                            <div style={{ fontWeight: '500' }}>2h 30m</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>ECONOMY</div>
                            <div style={{ fontWeight: '500', color: 'var(--success)' }}>₹{flight.economyPrice}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>PREMIUM</div>
                            <div style={{ fontWeight: '500', color: 'var(--accent)' }}>₹{flight.premiumPrice}</div>
                        </div>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <div style={{ marginBottom: '0.5rem' }}>✓ {flight.economySeats} Economy seats available</div>
                        <div>✓ {flight.premiumSeats} Premium seats available</div>
                    </div>
                </aside>

                {/* Right: Booking Form */}
                <main>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Passenger Details</h2>

                        <div className="form-group">
                            <label className="form-label">Full Name *</label>
                            <input
                                name="passengerName"
                                value={bookingData.passengerName}
                                onChange={handleChange}
                                placeholder="Enter passenger's full name"
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label className="form-label">Age *</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={bookingData.age}
                                    onChange={handleChange}
                                    placeholder="Age"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Gender</label>
                                <select name="gender" value={bookingData.gender} onChange={handleChange}>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Aadhar Number *</label>
                            <input
                                name="aadharNumber"
                                value={bookingData.aadharNumber}
                                onChange={handleChange}
                                placeholder="XXXX XXXX XXXX"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Class</label>
                            <select name="seatClass" value={bookingData.seatClass} onChange={handleChange}>
                                <option value="Economy">Economy — ₹{flight.economyPrice}</option>
                                <option value="Premium">Premium — ₹{flight.premiumPrice}</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Coupon Code</label>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <input
                                    name="coupon"
                                    placeholder="Enter coupon (e.g. KEYSIGHT)"
                                    value={bookingData.coupon}
                                    onChange={handleChange}
                                    style={{ flex: 1 }}
                                />
                                <button className="btn-secondary" onClick={applyCoupon} type="button">
                                    Apply
                                </button>
                            </div>
                            {couponMessage && (
                                <p style={{
                                    marginTop: '0.5rem',
                                    fontSize: '0.9rem',
                                    color: discount > 0 ? 'var(--success)' : 'var(--danger)'
                                }}>
                                    {couponMessage}
                                </p>
                            )}
                        </div>

                        {/* Price Breakdown */}
                        <div className="price-breakdown">
                            <div className="price-row">
                                <span>Base Fare</span>
                                <span>₹{totalPrice.toLocaleString()}</span>
                            </div>
                            {discount > 0 && (
                                <div className="price-row discount">
                                    <span>Discount</span>
                                    <span>- ₹{discount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="price-row total">
                                <span>Total</span>
                                <span className="amount">₹{(totalPrice - discount).toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            className="btn-primary"
                            style={{ width: '100%', marginTop: '1.5rem', padding: '1rem' }}
                            onClick={handleProceed}
                        >
                            Proceed to Payment →
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default BookingPage;
