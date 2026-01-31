package com.example.model;

import javax.persistence.*;

@Entity
@Table(name = "Flgt")
public class flight {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "flight_name")
    private String flightName;

    @Column(name = "airline_code")
    private String airlineCode;

    // ✅ Wrapper types (NOT primitive)
    @Column(name = "seats_available")
    private Integer seats;

    @Column(name = "flight_source")
    private String source;

    @Column(name = "flight_destination")
    private String destination;

    // ✅ Wrapper type (NOT primitive)
    @Column(name = "ticket_price")
    private Double price;

    // ===== Constructors =====

    // Required by JPA
    public flight() {
    }

    public flight(Long id, String flightName, String airlineCode,
                  Integer seats, String source,
                  String destination, Double price) {
        this.id = id;
        this.flightName = flightName;
        this.airlineCode = airlineCode;
        this.seats = seats;
        this.source = source;
        this.destination = destination;
        this.price = price;
    }

    // ===== Getters & Setters =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFlightName() {
        return flightName;
    }

    public void setFlightName(String flightName) {
        this.flightName = flightName;
    }

    public String getAirlineCode() {
        return airlineCode;
    }

    public void setAirlineCode(String airlineCode) {
        this.airlineCode = airlineCode;
    }

    public Integer getSeats() {
        return seats;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
