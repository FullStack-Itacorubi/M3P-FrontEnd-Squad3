import { Component, Input } from '@angular/core';
import { Exercise } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-exercises-section',
  templateUrl: './exercises-section.component.html',
  styleUrls: ['./exercises-section.component.css'],
})
export class ExercisesSectionComponent {
  @Input() exercises: Exercise[] = [];
  @Input() patientId = -1;
}
