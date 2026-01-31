import { Component } from '@angular/core';

@Component({
  selector: 'app-flight-header',
  standalone: true,
  templateUrl: './flight-header.html',
  styleUrls: ['./flight-header.css']
})
export class FlightHeader {
  airlineName = 'SkyWays Airlines';
  tagline = 'Fly Beyond Limits';
}
