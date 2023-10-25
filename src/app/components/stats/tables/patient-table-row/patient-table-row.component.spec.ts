import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTableRowComponent } from './patient-table-row.component';

describe('StatsTableRowComponent', () => {
  let component: PatientTableRowComponent;
  let fixture: ComponentFixture<PatientTableRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientTableRowComponent],
    });
    fixture = TestBed.createComponent(PatientTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
