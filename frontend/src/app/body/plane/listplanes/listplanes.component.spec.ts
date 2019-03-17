import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListplanesComponent } from './listplanes.component';

describe('ListplanesComponent', () => {
  let component: ListplanesComponent;
  let fixture: ComponentFixture<ListplanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListplanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListplanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
