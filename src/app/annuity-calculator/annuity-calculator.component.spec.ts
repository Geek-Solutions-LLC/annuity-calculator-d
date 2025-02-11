import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuityCalculatorComponent } from './annuity-calculator.component';

describe('AnnuityCalculatorComponent', () => {
  let component: AnnuityCalculatorComponent;
  let fixture: ComponentFixture<AnnuityCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnuityCalculatorComponent]
    });
    fixture = TestBed.createComponent(AnnuityCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
