import { Component, OnInit } from '@angular/core';
import { SessionTimerService } from 'session-timer-warning-lib';

@Component({
  selector: 'raapid-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  title = 'session-timer-lib';
  constructor(private sessionTimerService: SessionTimerService) {

  }
  ngOnInit(): void {
      this.sessionTimerService.sessionLogout$.subscribe((isLogout) => {
        console.log("CALL BACK isLogout", isLogout)
      })

  }
}
