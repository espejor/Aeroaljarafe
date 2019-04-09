import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizingAreaComponent } from './resizing-area.component';

describe('ResizingAreaComponent', () => {
  let component: ResizingAreaComponent;
  let fixture: ComponentFixture<ResizingAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResizingAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
