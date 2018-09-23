import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearanceSalesComponent } from './clearance-sales.component';

describe('ClearanceSalesComponent', () => {
  let component: ClearanceSalesComponent;
  let fixture: ComponentFixture<ClearanceSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearanceSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearanceSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
