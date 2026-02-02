import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

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
            <div className="navbar-brand">
                <Link to="/">✈️ Srijan's Airlines</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
                {user ? (
                    <>
                        <span className="navbar-user">Hi, {user.username}</span>
                        <Link to="/my-bookings">My Bookings</Link>
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
