import { Component } from '@angular/core';
import { FlightHeader } from './flight-header/flight-header';
import { FlightList } from './flight-list/flight-list';
import { FlightFooter } from './flight-footer/flight-footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FlightHeader, FlightList, FlightFooter],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Flight Management System';
}
