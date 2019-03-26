import { TestBed } from '@angular/core/testing';

import { CustomCalendarService } from './customCalendar.service';

describe('CalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomCalendarService = TestBed.get(CustomCalendarService);
    expect(service).toBeTruthy();
  });
});
