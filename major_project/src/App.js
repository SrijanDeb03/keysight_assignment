import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FlightList from './components/FlightList';
import FlightForm from './components/FlightForm';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import MyBookings from './pages/MyBookings';
import { AuthProvider } from './context/AuthContext';
import './App.css';

import ProtectedRoute from './components/ProtectedRoute';

// ... imports

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <FlightList />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-flight" element={
                <ProtectedRoute>
                  <FlightForm />
                </ProtectedRoute>
              } />
              <Route path="/edit-flight/:id" element={
                <ProtectedRoute>
                  <FlightForm />
                </ProtectedRoute>
              } />
              <Route path="/book/:id" element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              } />
              <Route path="/payment" element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              } />
              <Route path="/my-bookings" element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
