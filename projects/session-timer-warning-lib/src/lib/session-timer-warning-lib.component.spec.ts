import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTimerWarningLibComponent } from './session-timer-warning-lib.component';

describe('SessionTimerWarningLibComponent', () => {
  let component: SessionTimerWarningLibComponent;
  let fixture: ComponentFixture<SessionTimerWarningLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionTimerWarningLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionTimerWarningLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
