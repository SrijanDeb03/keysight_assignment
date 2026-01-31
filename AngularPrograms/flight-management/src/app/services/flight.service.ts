import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'   
})
export class FlightService {

  private flights = [
    {
      number: 'AI-101',
      source: 'Delhi',
      destination: 'Mumbai',
      time: '10:00 AM',
      status: 'On Time'
    },
    {
      number: 'SG-202',
      source: 'Bangalore',
      destination: 'Chennai',
      time: '12:30 PM',
      status: 'Delayed'
    },
    {
      number: 'UK-303',
      source: 'Kolkata',
      destination: 'Hyderabad',
      time: '03:45 PM',
      status: 'Cancelled'
    }
  ];


  getFlights() {
    return this.flights;
  }
}
