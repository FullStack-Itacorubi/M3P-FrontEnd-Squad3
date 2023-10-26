import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordComponent } from './patient-medical-record.component';

describe('PatientMedicalRecordComponent', () => {
  let component: PatientMedicalRecordComponent;
  let fixture: ComponentFixture<PatientMedicalRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientMedicalRecordComponent]
    });
    fixture = TestBed.createComponent(PatientMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
