import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForherdetailsComponent } from './forherdetails.component';

describe('ForherdetailsComponent', () => {
  let component: ForherdetailsComponent;
  let fixture: ComponentFixture<ForherdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForherdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForherdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
