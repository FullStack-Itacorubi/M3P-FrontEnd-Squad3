import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LabMedicalApiService } from 'src/app/shared/services/lab-medical-api.service';
import { endpoints } from 'src/app/shared/utils/endpoints';
import { MedicalRecord } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-patient-medical-record',
  templateUrl: './patient-medical-record.component.html',
  styleUrls: [
    './patient-medical-record.component.css',
    '../../app.component.css',
  ],
})
export class PatientMedicalRecordComponent implements OnInit {
  medicalRecord?: MedicalRecord;
  patientId = -1;

  constructor(
    private route: ActivatedRoute,
    private labMedicalApiService: LabMedicalApiService
  ) {}

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.patientId = Number(routeParams.get('patientId'));

    this.medicalRecord = (
      await this.labMedicalApiService.getAll<MedicalRecord>(
        endpoints.medicalRecord,
        this.patientId
      )
    ).pop();
  }
}
