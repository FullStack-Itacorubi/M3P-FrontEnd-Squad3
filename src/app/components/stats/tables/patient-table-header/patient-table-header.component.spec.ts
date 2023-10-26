import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTableHeaderComponent } from './patient-table-header.component';

describe('PatientTableHeaderComponent', () => {
  let component: PatientTableHeaderComponent;
  let fixture: ComponentFixture<PatientTableHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientTableHeaderComponent]
    });
    fixture = TestBed.createComponent(PatientTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
