import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalRecordsService } from 'src/app/shared/services/medical-records.service';
import { MedicalRecord } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-patient-medical-record',
  templateUrl: './patient-medical-record.component.html',
  styleUrls: ['./patient-medical-record.component.css'],
})
export class PatientMedicalRecordComponent implements OnInit {
  medicalRecord?: MedicalRecord;

  constructor(
    private route: ActivatedRoute,
    private medicalRecordsService: MedicalRecordsService
  ) {}

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const patientId: number = Number(routeParams.get('patientId'));

    this.medicalRecord =
      await this.medicalRecordsService.getPatientMedicalRecord(patientId);
  }
}
