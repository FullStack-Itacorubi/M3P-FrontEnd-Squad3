import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-medical-records-card',
  templateUrl: './medical-records-card.component.html',
  styleUrls: ['./medical-records-card.component.css'],
})
export class MedicalRecordsCardComponent {
  @Input() patient?: Patient;
}
