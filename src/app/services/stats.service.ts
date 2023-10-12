import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private baseUrl = 'http://localhost:3000/api';

  constructor() {}

  getStats() {
    return axios.get(`${this.baseUrl}/estatisticas`);
  }
}
