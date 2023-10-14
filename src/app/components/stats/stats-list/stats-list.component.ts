import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Patient, User } from 'src/app/utils/types';

export type StatsListStyle = 'TABLE' | 'GRID';

@Component({
  selector: 'app-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: ['./stats-list.component.css'],
})
export class StatsListComponent implements OnChanges {
  @Input() listStyle: StatsListStyle = 'GRID';
  @Input() data: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data);
  }

  calculateAge(dateStr: string) {
    if (!dateStr) return;

    const [day, month, year] = dateStr.split('/');
    const date = new Date(+year, +month - 1, +day);
    const ageDate = new Date(Date.now() - date.getTime());

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
