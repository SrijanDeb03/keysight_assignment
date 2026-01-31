import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
 
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TaskItemComponent } from './task-item/task-item.component';
import { FlightHeader } from './flight-header/flight-header';
import { FlightList } from './flight-list/flight-list';
import { FlightFooter } from './flight-footer/flight-footer';
 
@NgModule({
  declarations: [
    App,
    TaskItemComponent,
    FlightHeader,
    FlightList,
    FlightFooter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
 
 