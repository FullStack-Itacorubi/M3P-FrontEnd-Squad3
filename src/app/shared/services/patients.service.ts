import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../utils/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private baseUrl = environment.API_BASE_URL;

  constructor() {}

  getPatients() {
    return axios.get(`${this.baseUrl}/pacientes`);
  }
}
