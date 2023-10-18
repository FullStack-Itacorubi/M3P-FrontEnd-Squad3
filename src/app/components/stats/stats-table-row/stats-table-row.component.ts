import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-table-row',
  templateUrl: './stats-table-row.component.html',
  styleUrls: ['./stats-table-row.component.css'],
})
export class StatsTableRowComponent {
  @Input() name = '';
  @Input() healthInsurance = '';
  @Input() age?: string;
  @Input() phone = '';
  @Input() id = 1;
}
