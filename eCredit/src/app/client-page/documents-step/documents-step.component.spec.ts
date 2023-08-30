import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsStepComponent } from './documents-step.component';

describe('DocumentsStepComponent', () => {
  let component: DocumentsStepComponent;
  let fixture: ComponentFixture<DocumentsStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsStepComponent]
    });
    fixture = TestBed.createComponent(DocumentsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
