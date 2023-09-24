

import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Subject } from 'rxjs';


export interface Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
export const SESSION_COUNT_DOWN_KEY = 'SESSION_COUNT_DOWN_TIME';

@Injectable({
  providedIn: 'root'
})
export class SessionTimerService {

    constructor(private localStorageServices: LocalStorageService) { }

    sessionLogout$ = new Subject<any>();

    calculateTime(timeleft: any): Time {
        // Calculating the days, hours, minutes and seconds left
        const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeleft % (1000 * 60)) / 1000) + 1;
        return  {
            days,
            hours,
            minutes,
            seconds,
        };
    }

    isDateInSession(): any {

        return this.localStorageServices.get(SESSION_COUNT_DOWN_KEY);
    }

    removeCountDownDatesFromStorage() {
        console.log("Session deleted....");
        this.localStorageServices.delete(SESSION_COUNT_DOWN_KEY);
    }
    sessionLogout() {
      this.sessionLogout$.next(true);
    }
    getCountDownTime(minutes: any) {
        return new Date().getTime() + minutes * 60 * 1000;
    }

    storeTimeInSessionStorage(countDownDates: any) {
        this.localStorageServices.save(countDownDates, SESSION_COUNT_DOWN_KEY);
    }
}
