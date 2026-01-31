import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './flight-details.html',
  styleUrls: ['./flight-details.css']
})
export class FlightDetails {
  flightId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.flightId = this.route.snapshot.paramMap.get('id');
  }
}
