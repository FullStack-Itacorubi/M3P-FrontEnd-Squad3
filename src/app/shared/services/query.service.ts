import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../utils/environment';
import { AuthService } from './auth.service';
import { QueryRequest, QueryResponse } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private baseUrl = environment.API_BASE_URL;

  constructor(private authService: AuthService) {}

  async saveQuery(query: QueryRequest) {
    await axios.post(`${this.baseUrl}/consultas`, query, {
      headers: {
        userId: this.authService.getUserId(),
      },
    });
  }

  async getQueryById(id: number) {
    return (await axios.get<QueryResponse>(`${this.baseUrl}/consultas/${id}`))
      .data;
  }

  async updateQuery(query: QueryRequest) {
    await axios.put(`${this.baseUrl}/consultas/${query.id}`, query, {
      headers: {
        userId: this.authService.getUserId(),
      },
    });
  }

  async deleteQuery(id: number, patientId: number) {
    await axios.delete(`${this.baseUrl}/consultas/${id}`, {
      headers: {
        userId: this.authService.getUserId(),
        patientId,
      },
    });
  }
}
