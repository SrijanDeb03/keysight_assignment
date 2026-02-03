import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ from, to });
    };

    return (
        <div className="search-header">
            <h2>Find Your Perfect Flight</h2>
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-wrapper">
                    <span className="icon">🛫</span>
                    <input
                        type="text"
                        placeholder="From (e.g. Delhi)"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </div>
                <div className="search-divider"></div>
                <div className="search-input-wrapper">
                    <span className="icon">🛬</span>
                    <input
                        type="text"
                        placeholder="To (e.g. Mumbai)"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-primary" style={{ borderRadius: '40px' }}>
                    Search Flights
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
