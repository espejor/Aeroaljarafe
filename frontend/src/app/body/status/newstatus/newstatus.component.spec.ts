import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstatusComponent } from './newstatus.component';

describe('NewstatusComponent', () => {
  let component: NewstatusComponent;
  let fixture: ComponentFixture<NewstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
