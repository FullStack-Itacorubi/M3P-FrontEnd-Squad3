import { Component, Input } from '@angular/core';
import { calculateAge } from 'src/app/shared/utils/calculateAge';
import { Patient } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-patient-table-row',
  templateUrl: './patient-table-row.component.html',
  styleUrls: ['./patient-table-row.component.css'],
})
export class PatientTableRowComponent {
  @Input() patient?: Patient;

  getAge() {
    if (this.patient) return calculateAge(this.patient.birthday) + ' anos';
    return;
  }

  onClick() {}
}
