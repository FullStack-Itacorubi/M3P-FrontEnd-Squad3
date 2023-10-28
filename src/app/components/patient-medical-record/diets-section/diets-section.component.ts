import { Component, Input } from '@angular/core';
import { Diet } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-diets-section',
  templateUrl: './diets-section.component.html',
  styleUrls: ['./diets-section.component.css'],
})
export class DietsSectionComponent {
  @Input() diets: Diet[] = [];
  @Input() patientId = -1;
}
