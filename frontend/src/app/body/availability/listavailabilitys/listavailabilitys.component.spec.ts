import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListavailabilitysComponent } from './listavailabilitys.component';

describe('ListavailabilitysComponent', () => {
  let component: ListavailabilitysComponent;
  let fixture: ComponentFixture<ListavailabilitysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListavailabilitysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListavailabilitysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
