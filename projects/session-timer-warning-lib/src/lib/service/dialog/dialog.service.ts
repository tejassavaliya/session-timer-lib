import { Injectable, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SessionTimerDialogComponent } from '../../session-timer-dialog/session-timer-dialog.component';

interface ButtonLabel {
  yes: string,
  no: string
}
interface ButtonLabelAlert {
    ok: string
}
@Injectable({
  providedIn: 'root'
})

export class DialogService {

  COMMON_CONFIG = {
    position: {
      top: '50px'
    }
  }





  sessionWarningTimer$: Subject<any> = new Subject<any>();
  sessionDialogCloseRef$: Subject<any> = new Subject<any>();
  constructor(private dialog: MatDialog) {


  }


  /**
   * Confirm dialog with Yes and No button
   * @param message you want to show
   * @param title custom dialog title
   * @param buttonLabel custom dialog Yes / No Button text
   */
  showSessionTimerConfirmDialog(message?: string, title?: string, buttonLabel: ButtonLabel = { yes: 'Yes', no: 'No'} ) {
    let config: MatDialogConfig = {
      ...this.COMMON_CONFIG,
      panelClass: 'sessionWarningTimer',
      disableClose: true,
      data: { message, title, buttonLabel }
    }
    return this.dialog.open(SessionTimerDialogComponent, config);
  }


}
