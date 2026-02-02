import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // In a real app we'd use the backend, but for basic auth:
            // login also needs to verify credentials.
            const response = await axios.post('http://localhost:8080/auth/login', { username, password });

            const authHeader = 'Basic ' + btoa(username + ':' + password);
            login({ ...response.data, authHeader });
            navigate('/');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h2>
                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login</button>
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        Don't have an account? <span style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/register')}>Register</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
