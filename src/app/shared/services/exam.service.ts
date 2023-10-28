import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../utils/environment';
import { Exam } from '../utils/types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private baseUrl = environment.API_BASE_URL;

  constructor(private authService: AuthService) {}

  async saveExams(exam: Exam) {
    await axios.post(`${this.baseUrl}/exames`, exam, {
      headers: {
        userId: this.authService.getUserId(),
      },
    });
  }

  async getExamById(id: number) {
    return (await axios.get<Exam>(`${this.baseUrl}/exames/${id}`)).data;
  }

  async updateExam(exam: Exam) {
    await axios.put(`${this.baseUrl}/exames/${exam.id}`, exam, {
      headers: {
        userId: this.authService.getUserId(),
      },
    });
  }

  async deleteExam(id: number, patientId: number) {
    await axios.delete(`${this.baseUrl}/exames/${id}`, {
      headers: {
        userId: this.authService.getUserId(),
        patientId,
      },
    });
  }
}
