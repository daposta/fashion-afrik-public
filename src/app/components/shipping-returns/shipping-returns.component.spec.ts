import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingReturnsComponent } from './shipping-returns.component';

describe('ShippingReturnsComponent', () => {
  let component: ShippingReturnsComponent;
  let fixture: ComponentFixture<ShippingReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
