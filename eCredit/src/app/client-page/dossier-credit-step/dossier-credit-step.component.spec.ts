import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierCreditStepComponent } from './dossier-credit-step.component';

describe('DossierCreditStepComponent', () => {
  let component: DossierCreditStepComponent;
  let fixture: ComponentFixture<DossierCreditStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DossierCreditStepComponent]
    });
    fixture = TestBed.createComponent(DossierCreditStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
