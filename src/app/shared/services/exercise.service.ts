import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../utils/environment';
import { Exercise } from '../utils/types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private baseUrl = environment.API_BASE_URL;

  constructor(private authService: AuthService) {}

  async saveExercise(exercise: Exercise) {
    await axios.post(`${this.baseUrl}/exercicios`, exercise, {
      headers: {
        userId: this.authService.getUserId(),
      },
    });
  }

  async getExerciseById(id: number) {
    return (await axios.get<Exercise>(`${this.baseUrl}/exercicios/${id}`)).data;
  }

  async updateExercise(exercise: Exercise) {
    await axios.put(`${this.baseUrl}/exercicios/${exercise.id}`, exercise, {
      headers: {
        userId: this.authService.getUserId(),
      },
    });
  }
}
