import { TestBed } from '@angular/core/testing';

import { SessionTimerWarningLibService } from './session-timer-warning-lib.service';

describe('SessionTimerWarningLibService', () => {
  let service: SessionTimerWarningLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionTimerWarningLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
