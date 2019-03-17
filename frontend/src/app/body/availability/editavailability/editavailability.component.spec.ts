import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditavailabilityComponent } from './editavailability.component';

describe('EditavailabilityComponent', () => {
  let component: EditavailabilityComponent;
  let fixture: ComponentFixture<EditavailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditavailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditavailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
