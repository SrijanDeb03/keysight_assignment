package com.flightapp.controller;

import com.flightapp.model.Booking;
import com.flightapp.model.User;
import com.flightapp.model.Flight;
import com.flightapp.repository.BookingRepository;
import com.flightapp.repository.FlightRepository;
import com.flightapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        Flight flight = flightRepository.findById(booking.getFlight().getId())
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        booking.setFlight(flight);

        // Link to user if authenticated
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            userRepository.findByUsername(auth.getName()).ifPresent(booking::setUser);
        }

        // Dummy Payment Process
        booking.setStatus("CONFIRMED");

        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<Booking>> getMyBookings() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            return userRepository.findByUsername(auth.getName())
                    .map(user -> ResponseEntity.ok(bookingRepository.findByUserId(user.getId())))
                    .orElse(ResponseEntity.badRequest().build());
        }
        return ResponseEntity.status(401).build();
    }
}
