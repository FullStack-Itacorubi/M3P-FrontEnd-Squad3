import { Component, Input } from '@angular/core';
import { Exam } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-exams-section',
  templateUrl: './exams-section.component.html',
  styleUrls: ['./exams-section.component.css'],
})
export class ExamsSectionComponent {
  @Input() exams: Exam[] = [];
  @Input() patientId = -1;
}
