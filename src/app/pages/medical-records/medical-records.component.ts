import { Component, OnInit } from '@angular/core';
import { LabMedicalApiService } from 'src/app/shared/services/lab-medical-api.service';
import { endpoints } from 'src/app/shared/utils/endpoints';
import { MedicalRecord } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css'],
})
export class MedicalRecordsComponent implements OnInit {
  medicalRecords: MedicalRecord[] = [];

  constructor(private labMedicalApiService: LabMedicalApiService) {}

  async ngOnInit() {
    this.medicalRecords = await this.labMedicalApiService.getAll(
      endpoints.medicalRecord
    );
  }
}
