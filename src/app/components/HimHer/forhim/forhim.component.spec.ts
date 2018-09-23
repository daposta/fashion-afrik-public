import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForhimComponent } from './forhim.component';

describe('ForhimComponent', () => {
  let component: ForhimComponent;
  let fixture: ComponentFixture<ForhimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForhimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForhimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
