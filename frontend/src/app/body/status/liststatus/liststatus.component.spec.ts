import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListstatusComponent } from './liststatus.component';

describe('ListstatusComponent', () => {
  let component: ListstatusComponent;
  let fixture: ComponentFixture<ListstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
