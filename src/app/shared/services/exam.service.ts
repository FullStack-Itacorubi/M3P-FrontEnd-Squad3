import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../utils/environment';
import { Exam } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private baseUrl = environment.API_BASE_URL;

  constructor() { }

  async saveExams(exam: Exam){
    await axios.post(`${this.baseUrl}/exames`, exam, {
      headers: {
        userId: 1
      }
    });
  }
}
