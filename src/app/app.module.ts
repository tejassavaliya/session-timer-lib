import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionTimerWarningLibModule } from 'session-timer-warning-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SessionTimerWarningLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
