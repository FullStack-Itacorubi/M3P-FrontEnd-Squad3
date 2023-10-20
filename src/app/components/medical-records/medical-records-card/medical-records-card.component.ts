import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/shared/utils/types';

export type MedicalRecordsStats = {
  diets: number;
  queries: number;
  exercises: number;
  exams: number;
};

@Component({
  selector: 'app-medical-records-card',
  templateUrl: './medical-records-card.component.html',
  styleUrls: ['./medical-records-card.component.css'],
})
export class MedicalRecordsCardComponent {
  @Input() patient?: Patient;
  @Input() medicalRecordsStats: MedicalRecordsStats = {
    diets: 0,
    exams: 0,
    exercises: 0,
    queries: 0,
  };
}
