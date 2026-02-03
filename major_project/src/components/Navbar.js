import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="navbar-brand">
                    <Link to="/">
                        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>✈️</span>
                        Srijan's Airlines
                    </Link>
                </div>
                <div className="navbar-links" style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
                    {user ? (
                        <>
                            <span className="navbar-user">Hi, {user.username}</span>
                            <Link to="/my-bookings" className={location.pathname === '/my-bookings' ? 'active' : ''}>My Bookings</Link>
                            <button onClick={handleLogout} className="btn-logout">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
                            <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
