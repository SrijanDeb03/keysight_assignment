import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-list.html',
  styleUrls: ['./flight-list.css']
})
export class FlightList {

  flights: any[] = [];

  
  constructor(private flightService: FlightService) {
    this.flights = this.flightService.getFlights();
  }

}
