import { NgModule } from '@angular/core';
import { SessionTimerComponent } from './session-timer/session-timer.component';
import { SessionTimerDialogComponent } from './session-timer-dialog/session-timer-dialog.component';
import { MaterialModule } from './material/material.module';
import { SessionTimerWarningLibComponent } from './session-timer-warning-lib.component';
import { SessionTimerService } from '../public-api';




@NgModule({
  declarations: [
    SessionTimerWarningLibComponent,
    SessionTimerComponent,
    SessionTimerDialogComponent
  ],
  imports: [
    MaterialModule
  ],
  providers: [
    SessionTimerService
  ],
  exports: [
    SessionTimerWarningLibComponent
  ]
})
export class SessionTimerWarningLibModule { }
