import { Component } from '@angular/core';
import { FlightListComponent } from './flight-list/flight-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FlightListComponent],
  template: `
    <h1>Flight App Assignment</h1>
    <app-flight-list></app-flight-list>
  `
})
export class AppComponent {}
