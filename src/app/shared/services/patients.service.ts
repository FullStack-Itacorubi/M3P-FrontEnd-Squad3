import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../utils/environment';
import { Patient } from 'src/app/shared/utils/types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private baseUrl = environment.API_BASE_URL;

  constructor(private authService: AuthService) {}

  async getPatients(filter?: string) {
    const patients = await axios.get<Patient[]>(`${this.baseUrl}/pacientes`);
    if (!filter) return patients.data;
    return patients.data.filter((patient) =>
      patient.fullName.toLowerCase().includes(filter)
    );
  }

  async savePatients(patient: Patient) {
    await axios.post(`${this.baseUrl}/pacientes`, patient, {
      headers: {
        userId: this.authService.getUserId(),
      },
    });
  }

  async getPatientById(id: number) {
    return (await axios.get<Patient>(`${this.baseUrl}/pacientes/${id}`)).data;
  }
}
