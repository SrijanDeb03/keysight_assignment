package com.flightapp;

import com.flightapp.model.Flight;
import com.flightapp.repository.BookingRepository;
import com.flightapp.repository.FlightRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class DataSeeder implements CommandLineRunner {

    private final FlightRepository flightRepository;
    private final BookingRepository bookingRepository;
    private final Random random = new Random();
    private final String API_KEY = "50e4e3bb6ee6dbebee7920a45e72c06b";

    public DataSeeder(FlightRepository flightRepository, BookingRepository bookingRepository) {
        this.flightRepository = flightRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public void run(String... args) {
        try {
            // ALWAYS clear old data to ensure we see the new API data
            System.out.println("Clearing old booking data...");
            bookingRepository.deleteAll(); // Delete bookings first (foreign key constraint)
            System.out.println("Clearing old flight data...");
            flightRepository.deleteAll();

            System.out.println("Seeding data from Aviationstack API...");
            boolean apiSuccess = false;

            try {
            RestTemplate restTemplate = new RestTemplate();
            // Using HTTP as per AviationStack Free Tier requirement
            String url = "http://api.aviationstack.com/v1/flights?access_key=" + API_KEY + "&limit=50";

            ResponseEntity<AviationStackResponse> response = restTemplate.getForEntity(url,
                    AviationStackResponse.class);

            if (response.getBody() != null && response.getBody().getData() != null
                    && response.getBody().getData().length > 0) {
                for (AviationFlightData data : response.getBody().getData()) {
                    if (data.getDeparture() == null || data.getArrival() == null)
                        continue;

                    Flight flight = new Flight();

                    // Basic Info
                    String flightNum = (data.getFlight() != null && data.getFlight().getIata() != null)
                            ? data.getFlight().getIata()
                            : "PA-" + random.nextInt(9999);
                    flight.setFlightNumber(flightNum);

                    String origin = data.getDeparture().getAirport();
                    String dest = data.getArrival().getAirport();
                    flight.setOrigin(origin != null ? origin : "Unknown Origin");
                    flight.setDestination(dest != null ? dest : "Unknown Dest");

                    // Time
                    try {
                        if (data.getDeparture().getScheduled() != null
                                && data.getDeparture().getScheduled().length() >= 19) {
                            String dateStr = data.getDeparture().getScheduled().substring(0, 19);
                            flight.setDepartureTime(LocalDateTime.parse(dateStr));
                        } else {
                            flight.setDepartureTime(LocalDateTime.now().plusHours(random.nextInt(48)));
                        }
                    } catch (Exception e) {
                        flight.setDepartureTime(LocalDateTime.now().plusHours(random.nextInt(48)));
                    }

                    // Metadata
                    flight.setStatus("On Time"); // Default to On Time for better UI
                    flight.setEconomyPrice(3000.0 + random.nextInt(5000));
                    flight.setPremiumPrice(8000.0 + random.nextInt(10000));
                    flight.setEconomySeats(100 + random.nextInt(50));
                    flight.setPremiumSeats(20 + random.nextInt(10));

                    flightRepository.save(flight);
                }
                apiSuccess = true;
                System.out.println("Successfully seeded flights from Aviationstack.");
            }
            } catch (Exception e) {
                System.err.println("API Seeding Failed: " + e.getMessage());
                e.printStackTrace();
            }

            // FALLBACK: If API failed or returned 0 flights, seed Manual Data
            if (!apiSuccess || flightRepository.count() == 0) {
                System.out.println("API failed or returned no data. Using Manual Fallback Seeder...");
                seedManualData();
            }
        } catch (Exception e) {
            System.err.println("DataSeeder CRITICAL ERROR (application will continue): " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void seedManualData() {
        List<String> cities = Arrays.asList("Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune",
                "Dubai", "London", "New York");
        for (int i = 0; i < 20; i++) {
            Flight flight = new Flight();
            flight.setFlightNumber("PA-" + (100 + i));

            String origin = cities.get(random.nextInt(cities.size()));
            String dest = cities.get(random.nextInt(cities.size()));
            while (origin.equals(dest))
                dest = cities.get(random.nextInt(cities.size()));

            flight.setOrigin(origin);
            flight.setDestination(dest);
            flight.setDepartureTime(LocalDateTime.now().plusHours(random.nextInt(100)));
            flight.setStatus("On Time");

            flight.setEconomyPrice(4500.0 + random.nextInt(2000));
            flight.setPremiumPrice(9000.0 + random.nextInt(3000));
            flight.setEconomySeats(120);
            flight.setPremiumSeats(20);

            flightRepository.save(flight);
        }
        System.out.println("Seeded 20 Manual Fallback Flights.");
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    static class AviationStackResponse {
        private AviationFlightData[] data;

        public AviationFlightData[] getData() {
            return data;
        }

        public void setData(AviationFlightData[] data) {
            this.data = data;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    static class AviationFlightData {
        @JsonProperty("flight_status")
        private String flightStatus;
        private AviationEndpoint departure;
        private AviationEndpoint arrival;
        private AviationFlightDetails flight;

        public String getFlightStatus() {
            return flightStatus;
        }

        public void setFlightStatus(String flightStatus) {
            this.flightStatus = flightStatus;
        }

        public AviationEndpoint getDeparture() {
            return departure;
        }

        public void setDeparture(AviationEndpoint departure) {
            this.departure = departure;
        }

        public AviationEndpoint getArrival() {
            return arrival;
        }

        public void setArrival(AviationEndpoint arrival) {
            this.arrival = arrival;
        }

        public AviationFlightDetails getFlight() {
            return flight;
        }

        public void setFlight(AviationFlightDetails flight) {
            this.flight = flight;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    static class AviationEndpoint {
        private String airport;
        private String iata;
        private String scheduled;

        public String getAirport() {
            return airport;
        }

        public void setAirport(String airport) {
            this.airport = airport;
        }

        public String getIata() {
            return iata;
        }

        public void setIata(String iata) {
            this.iata = iata;
        }

        public String getScheduled() {
            return scheduled;
        }

        public void setScheduled(String scheduled) {
            this.scheduled = scheduled;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    static class AviationFlightDetails {
        private String number;
        private String iata;

        public String getNumber() {
            return number;
        }

        public void setNumber(String number) {
            this.number = number;
        }

        public String getIata() {
            return iata;
        }

        public void setIata(String iata) {
            this.iata = iata;
        }
    }
}
