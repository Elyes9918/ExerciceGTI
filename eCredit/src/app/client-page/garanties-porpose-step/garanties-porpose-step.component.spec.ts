import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantiesPorposeStepComponent } from './garanties-porpose-step.component';

describe('GarantiesPorposeStepComponent', () => {
  let component: GarantiesPorposeStepComponent;
  let fixture: ComponentFixture<GarantiesPorposeStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GarantiesPorposeStepComponent]
    });
    fixture = TestBed.createComponent(GarantiesPorposeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
