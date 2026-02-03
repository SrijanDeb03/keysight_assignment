import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function PaymentPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [status, setStatus] = useState('selection');
    const [method, setMethod] = useState('CARD');

    useEffect(() => {
        if (!state || !state.booking) {
            navigate('/');
        }
    }, [state, navigate]);

    const handlePayment = async () => {
        setStatus('processing');
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));

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

    const { totalPrice, passengerName, seatClass } = state.booking;

    return (
        <div className="container" style={{ maxWidth: '900px', marginTop: '2rem' }}>
            {status === 'selection' && (
                <>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Secure Payment</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                        {/* Order Summary */}
                        <div className="glass-card" style={{ padding: '1.5rem', height: 'fit-content' }}>
                            <h3 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                                Order Summary
                            </h3>
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Passenger</div>
                                <div style={{ fontWeight: '500' }}>{passengerName}</div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Class</div>
                                <div style={{ fontWeight: '500' }}>{seatClass}</div>
                            </div>
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Total</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                                        ₹{totalPrice.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="glass-card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                                Payment Method
                            </h3>

                            <div className="payment-methods">
                                {[
                                    { id: 'CARD', label: 'Card', icon: '💳' },
                                    { id: 'UPI', label: 'UPI', icon: '📱' },
                                    { id: 'GPAY', label: 'GPay', icon: '🅖' }
                                ].map(m => (
                                    <button
                                        key={m.id}
                                        className={`payment-method-tab ${method === m.id ? 'active' : ''}`}
                                        onClick={() => setMethod(m.id)}
                                    >
                                        <span style={{ marginRight: '0.5rem' }}>{m.icon}</span>
                                        {m.label}
                                    </button>
                                ))}
                            </div>

                            {method === 'CARD' && (
                                <div style={{ marginTop: '1.5rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Card Number</label>
                                        <input placeholder="1234 5678 9012 3456" />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label className="form-label">Expiry</label>
                                            <input placeholder="MM/YY" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">CVV</label>
                                            <input type="password" placeholder="•••" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Cardholder Name</label>
                                        <input placeholder="Name on card" />
                                    </div>
                                </div>
                            )}

                            {method === 'UPI' && (
                                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <div style={{
                                        width: '150px',
                                        height: '150px',
                                        background: 'white',
                                        margin: '0 auto 1rem',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--bg-dark)'
                                    }}>
                                        [QR Code]
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                        Scan QR or enter UPI ID
                                    </p>
                                    <input placeholder="username@upi" style={{ maxWidth: '280px' }} />
                                </div>
                            )}

                            {method === 'GPAY' && (
                                <div style={{ textAlign: 'center', padding: '3rem' }}>
                                    <div style={{
                                        fontSize: '3rem',
                                        marginBottom: '1rem'
                                    }}>
                                        💳
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                        Click below to pay with Google Pay
                                    </p>
                                    <button className="btn-secondary" style={{
                                        background: 'white',
                                        color: 'black',
                                        padding: '0.75rem 2rem',
                                        fontWeight: '600'
                                    }}>
                                        Open GPay
                                    </button>
                                </div>
                            )}

                            <button
                                className="btn-primary"
                                style={{ width: '100%', marginTop: '1.5rem', padding: '1rem' }}
                                onClick={handlePayment}
                            >
                                Pay ₹{totalPrice.toLocaleString()}
                            </button>
                        </div>
                    </div>
                </>
            )}

            {status === 'processing' && (
                <div className="glass-card" style={{ maxWidth: '400px', margin: '3rem auto', textAlign: 'center', padding: '3rem' }}>
                    <div className="loading-spinner" style={{ marginBottom: '1.5rem' }}></div>
                    <h3>Processing Payment</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Please wait while we confirm your transaction...
                    </p>
                </div>
            )}

            {status === 'success' && (
                <div className="success-card glass-card">
                    <div className="icon">✅</div>
                    <h2>Booking Confirmed!</h2>
                    <p>Your flight has been successfully booked. Check your email for confirmation.</p>
                    <button className="btn-primary" onClick={() => navigate('/my-bookings')}>
                        View My Bookings
                    </button>
                </div>
            )}

            {status === 'error' && (
                <div className="error-card glass-card">
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
                    <h2>Payment Failed</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Transaction was declined. Please try again.
                    </p>
                    <button className="btn-primary" onClick={() => setStatus('selection')}>
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
}

export default PaymentPage;
