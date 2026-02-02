import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function PaymentPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // Payment States
    const [status, setStatus] = useState('selection'); // selection, processing, success, error
    const [method, setMethod] = useState('CARD'); // CARD, UPI, GPAY

    useEffect(() => {
        if (!state || !state.booking) {
            navigate('/');
        }
    }, [state, navigate]);

    const handlePayment = async () => {
        setStatus('processing');
        try {
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Send booking to backend
            const bookingPayload = state.booking;
            const config = {};
            if (user && user.authHeader) {
                config.headers = { Authorization: user.authHeader };
            }

            await axios.post('http://localhost:8080/bookings', bookingPayload, config);
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (!state || !state.booking) return null;

    const { totalPrice } = state.booking;

    return (
        <div className="container" style={{ marginTop: '3rem', maxWidth: '800px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Secure Payment</h2>

            {status === 'selection' && (
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    {/* Left Side: Summary */}
                    <div className="card" style={{ flex: 1, height: 'fit-content' }}>
                        <h3>Order Summary</h3>
                        <p><strong>Passenger:</strong> {state.booking.passengerName}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                            <span>Total Amount:</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>₹{totalPrice}</span>
                        </div>
                    </div>

                    {/* Right Side: Payment Methods */}
                    <div className="card" style={{ flex: 2 }}>
                        <h3>Choose Payment Method</h3>

                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
                            {['CARD', 'UPI', 'GPAY'].map(m => (
                                <div
                                    key={m}
                                    onClick={() => setMethod(m)}
                                    style={{
                                        padding: '1rem',
                                        cursor: 'pointer',
                                        borderBottom: method === m ? '3px solid var(--primary)' : 'none',
                                        color: method === m ? 'var(--primary)' : '#aaa',
                                        fontWeight: method === m ? 'bold' : 'normal'
                                    }}
                                >
                                    {m === 'CARD' ? 'Debit/Credit Card' : (m === 'UPI' ? 'UPI / QR' : 'Google Pay')}
                                </div>
                            ))}
                        </div>

                        {/* Card Form */}
                        {method === 'CARD' && (
                            <div>
                                <div className="form-group">
                                    <label className="form-label">Card Number</label>
                                    <input placeholder="XXXX XXXX XXXX XXXX" />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">Expiry</label>
                                        <input placeholder="MM/YY" />
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">CVV</label>
                                        <input type="password" placeholder="123" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Card Holder Name</label>
                                    <input placeholder="Name on card" />
                                </div>
                            </div>
                        )}

                        {/* UPI Form */}
                        {method === 'UPI' && (
                            <div style={{ textAlign: 'center' }}>
                                <p>Scan QR to Pay</p>
                                <div style={{ width: '150px', height: '150px', background: '#eee', margin: '1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    [QR Code Placeholder]
                                </div>
                                <p>Or enter VPA:</p>
                                <input placeholder="username@upi" style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }} />
                            </div>
                        )}

                        {/* GPay Form */}
                        {method === 'GPAY' && (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <button style={{ background: 'black', color: 'white', padding: '1rem 2rem', borderRadius: '4px', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>
                                    Pay using GPay
                                </button>
                            </div>
                        )}

                        <button
                            className="btn-primary"
                            style={{ width: '100%', marginTop: '2rem' }}
                            onClick={handlePayment}
                        >
                            Pay ₹{totalPrice}
                        </button>
                    </div>
                </div>
            )}

            {status === 'processing' && (
                <div className="card" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
                    <h2>Contacting Bank...</h2>
                    <div style={{ marginTop: '2rem', fontSize: '3rem', animation: 'spin 1s infinite linear' }}>⏳</div>
                    <p>Please wait...</p>
                </div>
            )}

            {status === 'success' && (
                <div className="card" style={{ maxWidth: '500px', margin: '0 auto', borderTop: '5px solid green', textAlign: 'center' }}>
                    <h2 style={{ color: 'green' }}>Booking Successful! ✈️</h2>
                    <p>Your ticket has been booked.</p>
                    <div style={{ fontSize: '4rem', margin: '1rem' }}>✅</div>
                    <button className="btn-primary" onClick={() => navigate('/my-bookings')}>View My Bookings</button>
                </div>
            )}

            {status === 'error' && (
                <div className="card" style={{ maxWidth: '500px', margin: '0 auto', borderTop: '5px solid red', textAlign: 'center' }}>
                    <h2 style={{ color: 'red' }}>Payment Failed ❌</h2>
                    <p>Transaction declined by bank.</p>
                    <button className="btn-primary" onClick={() => setStatus('selection')}>Try Again</button>
                </div>
            )}
        </div>
    );
}

export default PaymentPage;
