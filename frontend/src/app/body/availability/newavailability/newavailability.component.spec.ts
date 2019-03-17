import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewavailabilityComponent } from './newavailability.component';

describe('NewavailabilityComponent', () => {
  let component: NewavailabilityComponent;
  let fixture: ComponentFixture<NewavailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewavailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewavailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
