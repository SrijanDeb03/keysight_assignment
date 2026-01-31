import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService, Flight } from '../services/flight';
 
@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-list.html',
  styleUrls: ['./flight-list.css']
})
export class FlightListComponent implements OnInit {
 
  flights: Flight[] = [];
  flight: Flight = {} as Flight;
 
  constructor(private flightService: FlightService) {}
 
  ngOnInit(): void {
    this.loadFlights();
  }
 
  loadFlights(): void {
    this.flightService.getFlights().subscribe(data => {
      this.flights = data;
    });
  }
 
  saveFlight(): void {
    if (this.flight.id) {
      this.flightService.updateFlight(this.flight).subscribe(() => {
        this.loadFlights();
        this.resetForm();
      });
    } else {
      this.flightService.addFlight(this.flight).subscribe(() => {
        this.loadFlights();
        this.resetForm();
      });
    }
  }
 
  editFlight(f: Flight): void {
    this.flight = {
      ...f,
      time: this.formatDateTime(f.time)
    };
  }
 
  deleteFlight(id?: number): void {
    if (id) {
      this.flightService.deleteFlight(id).subscribe(() => {
        this.loadFlights();
      });
    }
  }
 
  resetForm(): void {
    this.flight = {} as Flight;
  }
 
  //  FIX for datetime-local
  formatDateTime(dateStr: string): string {
    const date = new Date(dateStr);
    const pad = (n: number) => n < 10 ? '0' + n : n;
 
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
}
 
 