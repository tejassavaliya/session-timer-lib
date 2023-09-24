import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTimerDialogComponent } from './session-timer-dialog.component';

describe('SessionTimerDialogComponent', () => {
  let component: SessionTimerDialogComponent;
  let fixture: ComponentFixture<SessionTimerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionTimerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionTimerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
