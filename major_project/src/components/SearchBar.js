import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ from, to });
    };

    return (
        <div className="search-container" style={{
            background: 'linear-gradient(to right, #004aad, #0078ff)',
            padding: '2rem',
            borderRadius: '16px',
            marginBottom: '2rem',
            color: 'white',
            boxShadow: '0 10px 25px rgba(0, 74, 173, 0.2)'
        }}>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Where to next?</h2>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                background: 'white',
                padding: '0.5rem',
                borderRadius: '50px'
            }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '15px', top: '12px', color: '#aaa' }}>🛫</span>
                    <input
                        type="text"
                        placeholder="From (e.g. Delhi)"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        style={{ paddingLeft: '40px', border: 'none', margin: 0, height: '100%', borderRadius: '40px' }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: '#ccc' }}>↔️</div>
                <div style={{ flex: 1, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '15px', top: '12px', color: '#aaa' }}>🛬</span>
                    <input
                        type="text"
                        placeholder="To (e.g. Mumbai)"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        style={{ paddingLeft: '40px', border: 'none', margin: 0, height: '100%', borderRadius: '40px' }}
                    />
                </div>
                <button type="submit" className="btn-primary" style={{ borderRadius: '40px', padding: '0.8rem 2rem' }}>
                    SEARCH FLIGHTS
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
