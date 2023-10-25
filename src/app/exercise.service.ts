import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from './shared/utils/environment';
import { Exercise } from './shared/utils/types';
import { AuthService } from './shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private baseUrl = environment.API_BASE_URL;

  constructor(private authService : AuthService) { }

  async saveExercises(exercise: Exercise) {
    await axios.post(`${this.baseUrl}/exercises`, exercise, {
      headers: {
        userId: this.authService.getUserId()
      }
    });
  }
}
