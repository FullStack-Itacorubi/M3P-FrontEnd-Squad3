import { Component, OnInit } from '@angular/core';
import { MedicalRecordsService } from 'src/app/shared/services/medical-records.service';
import { MedicalRecord, Patient } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css'],
})
export class MedicalRecordsComponent implements OnInit {
  patientTest: Patient = {
    fullName: 'João Silva',
    id: 1,
    birthday: '05/05/1996',
    civilStatus: 'Solteiro',
    cpf: '000.000.000-00',
    email: 'email@email.com',
    emergencyContact: '(99) 9 9999-9999',
    genre: 'Cisgenero',
    phone: '(99) 9 9999-9999',
    rg: '',
    placeOfBirth: '',
    status: true,
    address: {
      cep: '',
      city: '',
      id: 1,
      neighborhood: '',
      number: '',
      publicPlace: '',
      state: '',
    },
  };
  medicalRecords: MedicalRecord[] = [];

  constructor(private medicalRecordsService: MedicalRecordsService) {}

  async ngOnInit() {
    this.medicalRecords = await this.medicalRecordsService.getMedicalRecords();
  }

  async onSearchInput(filter: string) {
    this.medicalRecords = await this.medicalRecordsService.getMedicalRecords(
      filter
    );
  }
}
