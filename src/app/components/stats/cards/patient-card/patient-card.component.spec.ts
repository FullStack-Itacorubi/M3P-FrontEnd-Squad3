import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsCardComponent } from './patient-card.component';

describe('PatientsCardComponent', () => {
  let component: PatientsCardComponent;
  let fixture: ComponentFixture<PatientsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsCardComponent],
    });
    fixture = TestBed.createComponent(PatientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
