import { Component, Input } from '@angular/core';

export type StatsListStyle = 'TABLE' | 'GRID';

@Component({
  selector: 'app-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: ['./stats-list.component.css'],
})
export class StatsListComponent {
  @Input() listStyle: StatsListStyle = 'GRID';
  @Input() data: any[] = [];

  calculateAge(dateStr: string) {
    if (!dateStr) return;

    const [day, month, year] = dateStr.split('/');
    const date = new Date(+year, +month - 1, +day);
    const ageDate = new Date(Date.now() - date.getTime());

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
