import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmodelComponent } from './newmodel.component';

describe('NewmodelComponent', () => {
  let component: NewmodelComponent;
  let fixture: ComponentFixture<NewmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
