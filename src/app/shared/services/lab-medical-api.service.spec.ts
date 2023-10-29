import { TestBed } from '@angular/core/testing';

import { LabMedicalApiService } from './lab-medical-api.service';

describe('LabMedicalApiService', () => {
  let service: LabMedicalApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabMedicalApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
