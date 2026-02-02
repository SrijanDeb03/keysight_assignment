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

    useEffect(() => {
        if (!user) {
            // navigate('/login'); // Optional
        }

        axios.get(`http://localhost:8080/api/flights/${id}`)
            .then(res => {
                setFlight(res.data);
                setTotalPrice(res.data.economyPrice);
            })
            .catch(err => console.error(err));
    }, [id, user, navigate]);

    const applyCoupon = () => {
        const code = bookingData.coupon ? bookingData.coupon.toUpperCase().trim() : '';
        setDiscount(0);
        setCouponMessage('');

        if (code === 'GIRISH') {
            const disc = Math.round(totalPrice * 0.10); // 10%
            setDiscount(disc);
            setCouponMessage(`Coupon Applied! You saved ₹${disc}`);
        } else if (code === 'FLYHIGH') {
            const disc = 500;
            setDiscount(disc);
            setCouponMessage('Flat ₹500 Off Applied!');
        } else if (code === 'KEYSIGHT') {
            const disc = Math.round(totalPrice * 0.20);
            setDiscount(disc);
            setCouponMessage('Keysight Special 20% Discount Applied!');
        } else if (code === '') {
            // do nothing
        } else {
            setCouponMessage('Invalid Coupon Code');
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
            alert("Please fill all details");
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

    if (!flight) return <div>Loading...</div>;

    return (
        <div className="container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Flight Details</h2>
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3>{flight.origin} ➝ {flight.destination}</h3>
                    <p><strong>Flight:</strong> {flight.flightNumber}</p>
                    <p><strong>Date:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                    <hr style={{ margin: '1rem 0', borderColor: '#e2e8f0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p>Economy Seats: {flight.economySeats}</p>
                            <p style={{ color: 'green', fontWeight: 'bold' }}>₹{flight.economyPrice}</p>
                        </div>
                        <div>
                            <p>Premium Seats: {flight.premiumSeats}</p>
                            <p style={{ color: 'purple', fontWeight: 'bold' }}>₹{flight.premiumPrice}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1.5, minWidth: '300px' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Passenger Details</h2>
                <div className="card">
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input name="passengerName" value={bookingData.passengerName} onChange={handleChange} required />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">Age</label>
                            <input type="number" name="age" value={bookingData.age} onChange={handleChange} required />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">Gender</label>
                            <select name="gender" value={bookingData.gender} onChange={handleChange}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Aadhar Card Number</label>
                        <input name="aadharNumber" value={bookingData.aadharNumber} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Seat Class</label>
                        <select name="seatClass" value={bookingData.seatClass} onChange={handleChange}>
                            <option value="Economy">Economy (₹{flight.economyPrice})</option>
                            <option value="Premium">Premium (₹{flight.premiumPrice})</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Coupon Code (KEYSIGHT)</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input name="coupon" placeholder="Enter Coupon" value={bookingData.coupon} onChange={handleChange} />
                            <button className="btn-primary" onClick={applyCoupon} style={{ width: 'auto', margin: 0 }}>Apply</button>
                        </div>
                        {couponMessage && <p style={{ color: discount > 0 ? 'green' : 'red', marginTop: '0.5rem' }}>{couponMessage}</p>}
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: 'var(--text-main)' }}>
                            <span>Base Fare:</span>
                            <span>₹{totalPrice}</span>
                        </div>
                        {discount > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: 'var(--success)' }}>
                                <span>Discount:</span>
                                <span>- ₹{discount}</span>
                            </div>
                        )}
                        <hr style={{ margin: '1rem 0', borderColor: 'rgba(255,255,255,0.1)' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>Total:</span>
                            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>₹{totalPrice - discount}</span>
                        </div>
                    </div>

                    <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={handleProceed}>
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookingPage;
