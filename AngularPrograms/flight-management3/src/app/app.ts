import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="nav">
      <a routerLink="/home" routerLinkActive="active">Home</a>
      <a routerLink="/flights" routerLinkActive="active">Flights</a>
      <a routerLink="/admin" routerLinkActive="active">Admin</a>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .nav a {
      margin-right: 15px;
      text-decoration: none;
      font-weight: bold;
    }
    .active {
      color: darkblue;
    }
  `]
})
export class App {}
