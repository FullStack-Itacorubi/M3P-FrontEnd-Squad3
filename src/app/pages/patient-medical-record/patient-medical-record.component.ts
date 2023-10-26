import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalRecordsService } from 'src/app/shared/services/medical-records.service';
import { MedicalRecord, Medicament } from 'src/app/shared/utils/types';

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

  listMedicaments(medicaments: Medicament[]): string {
    return medicaments.map((med) => med.name).join(', ') + '.';
  }

  getUniqueMedicaments() {
    const medicaments = new Map<number, Medicament>();
    this.medicalRecord?.queries.map((query) =>
      query.medicaments.map((medicament) =>
        medicaments.set(medicament.id!, medicament)
      )
    );
    return [...medicaments.values()];
  }

  getMedicamentsTotal() {
    return this.getUniqueMedicaments().length;
  }
}
