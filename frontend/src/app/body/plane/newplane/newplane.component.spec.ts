import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewplaneComponent } from './newplane.component';

describe('NewplaneComponent', () => {
  let component: NewplaneComponent;
  let fixture: ComponentFixture<NewplaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewplaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewplaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
