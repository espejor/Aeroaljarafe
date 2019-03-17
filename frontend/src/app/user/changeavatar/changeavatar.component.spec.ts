import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeavatarComponent } from './changeavatar.component';

describe('ChangeavatarComponent', () => {
  let component: ChangeavatarComponent;
  let fixture: ComponentFixture<ChangeavatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeavatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeavatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
