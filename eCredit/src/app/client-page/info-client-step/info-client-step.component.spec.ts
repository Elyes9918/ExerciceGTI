import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoClientStepComponent } from './info-client-step.component';

describe('InfoClientStepComponent', () => {
  let component: InfoClientStepComponent;
  let fixture: ComponentFixture<InfoClientStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoClientStepComponent]
    });
    fixture = TestBed.createComponent(InfoClientStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
