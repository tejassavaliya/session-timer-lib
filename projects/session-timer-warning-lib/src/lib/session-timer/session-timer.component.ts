import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, fromEvent, interval } from 'rxjs';
// import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
// import { DialogService } from '../../dialog/dialog.service';
// import { SessionTimerService } from 'src/app/core/services/session-timer/session-timer.service';
// import { AuthService } from 'src/app/core/auth/auth.service';
// import { debounce } from '../../utility/debounce.decorator';
// import { AppConfig } from '../../constants/app.config';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DialogService } from '../service/dialog/dialog.service';
import { SessionTimerService } from '../service/session-timer/session-timer.service';
import { ngDebounce } from '../decorator/debounce.decorator';
@Component({
  selector: 'lib-session-timer',
  templateUrl: './session-timer.component.html',
  styleUrls: ['./session-timer.component.css']
})
export class SessionTimerComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  //
  /** timer configuration both ways ( using binding below keys with
   *  custom minutes or define default minute in AppConfig configuration)
  //  */
  // @Input() totalDurationminutes =  2; // AppConfig.totalDurationminutes
  // @Input() warningDurationMinutes = 1; // AppConfig.warningDurationMinutes;
  totalDurationminutes =  2;
  warningDurationMinutes = 1;
  countDownDate: any;
  countDownWarningDate: any;
  displayTime:any;
  interval: any;
  reachedAtWarningDialog:boolean = false;
  SESSION_COUNT_DOWN_KEY = 'SESSION_COUNT_DOWN_TIME';
  channel = new BroadcastChannel('app-session');
  isDateInSession: boolean = false;
  documentScroll$ = fromEvent(document, 'scroll', { capture: true });
  private readonly destroy$ = new Subject();
  constructor(
    // private authService: AuthService,
    private dialogService: DialogService,
    private sessionTimerService: SessionTimerService,
  ) { }

  ngOnInit() {

    // remove localstorage session time when page load
    this.sessionTimerService.removeCountDownDatesFromStorage();

    this.broadCastMessageToMultiTabs('new-page-load');

     // Subscribe timer when page load
     this.subscribeTimer();

     /**
      * Subscribe broadcast when any action happens, so every product
      * tabs get notification to update session timer
      */
     this.subscribeWarningAction();

     this.handleScroll();

  }

  handleScroll() {
    this.documentScroll$
        .pipe(takeUntil(this.destroy$),debounceTime(1000)).subscribe((event) => {
            const isDateInSession = this.sessionTimerService.isDateInSession();
            if(isDateInSession && !this.reachedAtWarningDialog) {
                this.resetTimer('reset');
            }
    });

  }

  subscribeWarningAction() {


    this.channel.addEventListener ('message', (event) => {
        // console.log("MESSAGE LISTNER....", event );

        if(this.reachedAtWarningDialog) {
            this.dialogService.sessionDialogCloseRef$.next(true)
        }
        if(event.data === 'logout') {
            this.logout(true);
        }
        this.sessionTimerService.removeCountDownDatesFromStorage();
        clearInterval(this.interval);
        this.reachedAtWarningDialog = false;
        this.subscribeTimer();


    });

  }
  subscribeTimer() {

    this.setCountDownDate();
    this.interval = setInterval(() => {
        const now = new Date().getTime();
        const timeleft = this.countDownDate - now;
        const timeleftWarning = this.countDownWarningDate - now;

        // Calculating the days, hours, minutes and seconds left
        this.displayTime = this.sessionTimerService.calculateTime(timeleft);

        // subscribe timer for dialog to get inside the left time
        this.dialogService.sessionWarningTimer$.next(this.displayTime);

        // when timer reaches at warning time
        if(timeleftWarning < 0 && !this.reachedAtWarningDialog  ) {
            console.log("Session reaches at warning time...")
            this.onSessionTimeOutWarning();
        }

        // when timer reaches at sessin expired time
        if (timeleft < 0) {
            console.log("Session reaches at expired time...")
            this.logout();
        }

        // console.log("TIMELEFT COUNT !!!! ",  this.displayTime)
      },1000)
  }

  setCountDownDate() {
    const isDateInSession = this.sessionTimerService.isDateInSession();
    if(isDateInSession) {
        this.countDownDate = isDateInSession.countDownDate
        this.countDownWarningDate = isDateInSession.countDownWarningDate;
    } else {
        this.countDownDate = this.sessionTimerService.getCountDownTime(this.totalDurationminutes)
        this.countDownWarningDate = this.sessionTimerService.getCountDownTime(this.warningDurationMinutes);
    }
    const countDownDates = { countDownDate: this.countDownDate, countDownWarningDate: this.countDownWarningDate };
    this.sessionTimerService.storeTimeInSessionStorage(countDownDates);
  }


  resetTimer(broadCastMessage: any) {
    console.log("reset timer....")
    this.reachedAtWarningDialog = false;

    // broadcast message to another tabs where product is opened
    this.broadCastMessageToMultiTabs(broadCastMessage);

    this.sessionTimerService.removeCountDownDatesFromStorage();
    clearInterval(this.interval);

    this.subscribeTimer();
  }

onSessionTimeOutWarning() {
    this.reachedAtWarningDialog = true;
    const confirmDialogRef = this.dialogService.showSessionTimerConfirmDialog(
        '',
        'Your session is about to expire!',
        { yes: 'Yes, Keep me signed in', no: 'No, Sign me out'}
    );

    this.subscriptions.add(
        confirmDialogRef.beforeClosed()
        .subscribe((isContinue: any) => {
            // console.log("Timer Dialog action", isContinue)
            if(isContinue) {
                this.resetTimer('reset');
            } else {
                this.logout();
            }
        })
    );

}
broadCastMessageToMultiTabs(message: any) {
    this.channel.postMessage(message);
}
logout(isRequireBroadCast = false) {

    if(!isRequireBroadCast) {
        this.broadCastMessageToMultiTabs('logout');
    }
    console.log("Auth service LOGOUT....")
    this.resetTimer('reset'); // added additional reset in LIBRARY
    this.sessionTimerService.sessionLogout();
    // this.authService.logout(true, true);

}

@HostListener('window:mousemove')
  @ngDebounce(300)
  refreshUserState() {
    const isDateInSession = this.sessionTimerService.isDateInSession();
    if(isDateInSession && !this.reachedAtWarningDialog) {
        // console.log("reset on move....")
        this.resetTimer('reset');
    }
  }
  @HostListener('document:keypress', ['$event'])
  @ngDebounce(300)
  handleKeyboardEvent(event: KeyboardEvent) {
    const isDateInSession = this.sessionTimerService.isDateInSession();
    if(isDateInSession && !this.reachedAtWarningDialog ) {
        // console.log("reset on key press....")
        this.resetTimer('reset');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.channel.close();
    this.destroy$.unsubscribe();
  }

}
