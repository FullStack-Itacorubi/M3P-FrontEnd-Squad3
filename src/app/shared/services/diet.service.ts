import { Injectable } from '@angular/core';
import { environment } from '../utils/environment';
import { Diet } from '../utils/types';
import axios from 'axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  private baseUrl = environment.API_BASE_URL;

  constructor(private authService: AuthService) {}

  async saveDiet(diet: Diet) {
    await axios.post(`${this.baseUrl}/dietas`, diet, {
      headers: {
        userId: this.authService.getUserId(),
      },
    });
  }

  async getDietById(id: number) {
    return (await axios.get<Diet>(`${this.baseUrl}/dietas/${id}`)).data;
  }

  async updateDiet(diet: Diet) {
    await axios.put(`${this.baseUrl}/dietas/${diet.id}`, diet, {
      headers: {
        userId: this.authService.getUserId(),
      },
    });
  }

  async deleteDiet(id: number, patientId: number) {
    await axios.delete(`${this.baseUrl}/dietas/${id}`, {
      headers: {
        userId: this.authService.getUserId(),
        patientId,
      },
    });
  }
}
