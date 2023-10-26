import { Component, Input } from '@angular/core';
import { calculateAge } from 'src/app/shared/utils/calculateAge';
import { Patient } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.css'],
})
export class PatientCardComponent {
  @Input() patient?: Patient;

  onClick() {}

  getAge() {
    if (this.patient) return calculateAge(this.patient.birthday) + ' anos';
    return;
  }
}
