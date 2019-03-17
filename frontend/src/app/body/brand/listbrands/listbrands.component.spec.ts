import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbrandsComponent } from './listbrands.component';

describe('ListbrandsComponent', () => {
  let component: ListbrandsComponent;
  let fixture: ComponentFixture<ListbrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
