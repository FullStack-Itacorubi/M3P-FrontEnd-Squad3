import { Component, Input } from '@angular/core';
import { calculateAge } from 'src/app/shared/utils/calculateAge';
import { Patient } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-stats-table-row',
  templateUrl: './stats-table-row.component.html',
  styleUrls: ['./stats-table-row.component.css'],
})
export class StatsTableRowComponent {
  @Input() patient?: Patient;

  getAge() {
    if (this.patient) return calculateAge(this.patient.birthday) + ' anos';
    return;
  }

  onClick() {}
}
