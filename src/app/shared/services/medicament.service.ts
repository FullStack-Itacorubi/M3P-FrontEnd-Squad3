import { Injectable } from '@angular/core';
import { environment } from '../utils/environment';
import { AuthService } from './auth.service';
import { Medicament } from 'src/app/shared/utils/types';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class MedicamentService {
  private baseUrl = environment.API_BASE_URL;

  constructor(private authService: AuthService) {}

  async saveMedicaments(medicament: Medicament) {
    await axios.post(`${this.baseUrl}/medicamentos`, medicament, {
      headers: {
        userId: this.authService.getUserId(),
      },
    });
  }

  async getMedicaments() {
    return (await axios.get<Medicament[]>(`${this.baseUrl}/medicamentos`)).data;
  }
}
