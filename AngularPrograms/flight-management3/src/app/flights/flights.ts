import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './flights.html',
  styleUrls: ['./flights.css']
})
export class Flights {
  flights = [
    { id: 101, flightNo: 'Indigo' },
    { id: 202, flightNo: 'AirIndia' },
    { id: 303, flightNo: 'Boeing' }
  ];
}
