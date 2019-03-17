import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditplaneComponent } from './editplane.component';

describe('EditplaneComponent', () => {
  let component: EditplaneComponent;
  let fixture: ComponentFixture<EditplaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditplaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditplaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
