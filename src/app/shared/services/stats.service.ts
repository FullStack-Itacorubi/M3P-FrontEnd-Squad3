import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../utils/environment';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private baseUrl = environment.API_BASE_URL;

  constructor() {}

  getStats() {
    return axios.get(`${this.baseUrl}/estatisticas`);
  }
}
