import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../utils/environment';
import { MedicalRecord } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordsService {
  private baseUrl = environment.API_BASE_URL;

  constructor() {}

  async getMedicalRecords(filter?: string) {
    if (!filter)
      return (await axios.get<MedicalRecord[]>(`${this.baseUrl}/prontuarios`))
        .data;

    const isFilterAString = isNaN(Number(filter));
    return (
      await axios.get<MedicalRecord[]>(
        `${this.baseUrl}/prontuarios${
          isFilterAString ? `?nome=${filter}` : `?id=${filter}`
        }`
      )
    ).data;
  }

  async getPatientMedicalRecord(id: number) {
    const medicalRecords = await axios.get<MedicalRecord[]>(
      `${this.baseUrl}/prontuarios?id=${id}`
    );

    return medicalRecords.data[0];
  }
}
