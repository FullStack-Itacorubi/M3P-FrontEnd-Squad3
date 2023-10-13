import { Component, Input } from '@angular/core';

export type StatsListStyle = 'TABLE' | 'GRID';

@Component({
  selector: 'app-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: ['./stats-list.component.css'],
})
export class StatsListComponent {
  @Input() listStyle: StatsListStyle = 'GRID';
  @Input() data: number[] = [];
}
