import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../utils/environment';
import { AuthService } from './auth.service';
import { Query } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private baseUrl = environment.API_BASE_URL;

  constructor(private authService: AuthService) {}

  async saveQuery(query: Query) {
    await axios.post(`${this.baseUrl}/consultas`, query, {
      headers: {
        userId: this.authService.getUserId(),
      },
    });
  }
}
