import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpersonaluserdataComponent } from './editpersonaluserdata.component';

describe('EditpersonaluserdataComponent', () => {
  let component: EditpersonaluserdataComponent;
  let fixture: ComponentFixture<EditpersonaluserdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpersonaluserdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpersonaluserdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
