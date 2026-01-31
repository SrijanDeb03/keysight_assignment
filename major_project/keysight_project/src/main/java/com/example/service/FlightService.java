package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.model.flight;
import com.example.repository.flightRepository;

@Service
public class FlightService {

    private final flightRepository flightrepos;

    public FlightService(flightRepository flightrepos) {
        this.flightrepos = flightrepos;
    }

    // ✅ Create
    public flight addFlight(flight flight) {
        return flightrepos.save(flight);
    }

    // ✅ Fetch all
    public List<flight> getAllFlights() {
        return flightrepos.findAll();
    }

    // ✅ Fetch single flight (IMPORTANT)
    public flight getFlightById(Long id) {
        return flightrepos.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found with id: " + id));
    }

    // ✅ Update ALL fields (CRITICAL FIX)
    public flight updateFlight(Long id, flight updatedFlight) {

        flight existing = flightrepos.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found with id: " + id));

        existing.setFlightName(updatedFlight.getFlightName());
        existing.setAirlineCode(updatedFlight.getAirlineCode());
        existing.setSeats(updatedFlight.getSeats());
        existing.setSource(updatedFlight.getSource());
        existing.setDestination(updatedFlight.getDestination());
        existing.setPrice(updatedFlight.getPrice());

        return flightrepos.save(existing);
    }

    // ✅ Delete
    public String deleteFlight(Long id) {
        flightrepos.deleteById(id);
        return "Flight deleted successfully";
    }
}
