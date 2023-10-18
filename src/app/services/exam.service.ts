import { Injectable } from '@angular/core';

export interface exam{
  examName: string;
  examDate: string;
  examHour: string;
  ExamType: string;
  laboratory: string;
  documentUrl: string;
  results: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor() { }
}
