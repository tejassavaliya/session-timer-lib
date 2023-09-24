import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogService } from '../service/dialog/dialog.service';


@Component({
  selector: 'lib-session-timer-dialog',
  templateUrl: './session-timer-dialog.component.html',
  styleUrls: ['./session-timer-dialog.component.css']
})
export class SessionTimerDialogComponent implements OnInit {

    subscriptions: Subscription = new Subscription();
    // timer: any;
    timerText: string = '00h : 00m : 00s';
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SessionTimerDialogComponent>,
    private dialogService: DialogService) { }

    ngOnInit() {

        this.subscriptions.add(this.dialogService.sessionWarningTimer$.subscribe(
          countDownTimer => {
            // console.log("counter in dialog ", countDownTimer);
            // this.timer = countDownTimer; //  `${countDownTimer.days}d : ${countDownTimer.hours}h : ${countDownTimer.minutes}m : ${countDownTimer.seconds}s `
            this.timerText =  `${countDownTimer.hours}h : ${countDownTimer.minutes}m : ${countDownTimer.seconds}s `;
          }
        ));

        this.subscriptions.add(this.dialogService.sessionDialogCloseRef$.subscribe(
            tobeClose => {

                this.dialogRef.close(tobeClose);

            }
          ));



    }

}
