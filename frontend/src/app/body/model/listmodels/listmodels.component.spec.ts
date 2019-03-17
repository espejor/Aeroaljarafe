import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmodelsComponent } from './listmodels.component';

describe('ListmodelsComponent', () => {
  let component: ListmodelsComponent;
  let fixture: ComponentFixture<ListmodelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmodelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmodelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
