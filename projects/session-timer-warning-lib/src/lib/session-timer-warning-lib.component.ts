import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-session-timer-warning-lib',
  templateUrl: './session-timer-warning-lib.component.html',
  styleUrls: ['./session-timer-warning-lib.component.css']
})


export class SessionTimerWarningLibComponent {
  @Input() totalDurationminutes: any; // AppConfig.totalDurationminutes
  @Input() warningDurationMinutes: any; // AppConfig.warningDurationMinutes;
  @Input() isShowTimer: boolean = false;
}
