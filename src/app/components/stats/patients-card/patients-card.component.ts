import { Component, Input } from '@angular/core';
import { calculateAge } from 'src/app/shared/utils/calculateAge';
import { Patient } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-patients-card',
  templateUrl: './patients-card.component.html',
  styleUrls: ['./patients-card.component.css'],
})
export class PatientsCardComponent {
  @Input() patient?: Patient;

  onClick() {}

  getAge() {
    if (this.patient) return calculateAge(this.patient.birthday) + ' anos';
    return;
  }
}
