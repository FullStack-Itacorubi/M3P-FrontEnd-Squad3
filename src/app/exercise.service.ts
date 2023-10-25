import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from './shared/utils/environment';
import { Exercise } from './shared/utils/types';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private baseUrl = environment.API_BASE_URL;

  constructor() { }

  async saveExercises(exercise: Exercise) {
    await axios.post(`${this.baseUrl}/exercises`, exercise, {
      headers: {
        userId: 1
      }
    });
  }
}
