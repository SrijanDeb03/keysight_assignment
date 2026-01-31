package com.example.controller;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
 
import com.example.model.flight;
import com.example.service.FlightService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/flights")
public class flightController {
 
    @Autowired
    private FlightService flightService;
 
    @RequestMapping(value = "/add/flight", method = RequestMethod.POST)
    public flight addFlight(@RequestBody flight flight) {
        return flightService.addFlight(flight);
    }
 
    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public List<flight> getAllFlights() {
        return flightService.getAllFlights();
    }
    
    
    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    public flight getFlightById(@PathVariable Long id) {
        return flightService.getFlightById(id);
    }
    @PutMapping("/{id}")
    public flight updateFlight(@PathVariable Long id, @RequestBody flight flight) {
    	return flightService.updateFlight(id, flight);
    }
    
    @DeleteMapping("/{id}")
    public String deleteFlight(@PathVariable Long id) {
    	return flightService.deleteFlight(id);
    }
}