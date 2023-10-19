import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../utils/environment';
import { Patient } from 'src/app/shared/utils/types';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private baseUrl = environment.API_BASE_URL;

  constructor() {}

  async getPatients(filter?: string) {
    const patients = await axios.get<Patient[]>(`${this.baseUrl}/pacientes`);
    if (!filter) return patients.data;
    return patients.data.filter((patient) =>
      patient.fullName.toLowerCase().includes(filter)
    );
  }
}
