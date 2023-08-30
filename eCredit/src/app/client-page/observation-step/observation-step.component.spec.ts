import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationStepComponent } from './observation-step.component';

describe('ObservationStepComponent', () => {
  let component: ObservationStepComponent;
  let fixture: ComponentFixture<ObservationStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObservationStepComponent]
    });
    fixture = TestBed.createComponent(ObservationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
