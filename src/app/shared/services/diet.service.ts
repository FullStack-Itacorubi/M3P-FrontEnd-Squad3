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

  constructor( private authService: AuthService) {}

  async saveDiets(diet: Diet) {
    await axios.post(`${this.baseUrl}/dietas`, diet, {
      headers: {
        userId: this.authService.getUserId()
      },
    });
  }
}
