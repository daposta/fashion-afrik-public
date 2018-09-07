import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForherComponent } from './forher.component';

describe('ForherComponent', () => {
  let component: ForherComponent;
  let fixture: ComponentFixture<ForherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
