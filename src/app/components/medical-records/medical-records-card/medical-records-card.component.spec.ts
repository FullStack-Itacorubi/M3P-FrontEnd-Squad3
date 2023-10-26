import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRecordsCardComponent } from './medical-records-card.component';

describe('MedicalRecordsCardComponent', () => {
  let component: MedicalRecordsCardComponent;
  let fixture: ComponentFixture<MedicalRecordsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalRecordsCardComponent]
    });
    fixture = TestBed.createComponent(MedicalRecordsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
