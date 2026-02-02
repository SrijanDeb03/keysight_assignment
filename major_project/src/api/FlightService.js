import axios from 'axios';

const API_URL = '/api/flights'; // Proxy will handle the localhost:8080 redirect

class FlightService {
    getAllFlights() {
        return axios.get(API_URL);
    }

    getFlightById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    createFlight(flight) {
        return axios.post(API_URL, flight);
    }

    updateFlight(id, flight) {
        return axios.put(`${API_URL}/${id}`, flight);
    }

    deleteFlight(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

const flightServiceInstance = new FlightService();
export default flightServiceInstance;
