import { Injectable } from '@angular/core';

export interface exercise{
  name: string;
  date: string;
  time: string;
  type: string;
  weeklyAmoun: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor() { }
}
