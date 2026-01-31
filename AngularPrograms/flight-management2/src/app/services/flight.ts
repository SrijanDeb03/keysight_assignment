import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export interface Flight {
  id?: number;
  flightNo: string;
  airline: string;
  from: string;
  to: string;
  time: string;
  price: number;
  status: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class FlightService {
 
  private apiUrl = 'http://localhost:3000/flights';
 
  constructor(private http: HttpClient) {}
 
  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }
 
  addFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.apiUrl, flight);
  }
 
  updateFlight(flight: Flight): Observable<Flight> {
    return this.http.put<Flight>(`${this.apiUrl}/${flight.id}`, flight);
  }
 
  deleteFlight(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
 