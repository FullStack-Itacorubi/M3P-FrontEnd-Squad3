import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-table-row',
  templateUrl: './stats-table-row.component.html',
  styleUrls: ['./stats-table-row.component.css'],
})
export class StatsTableRowComponent {
  @Input() name = 'Joaquim da Silva Santos Albuquerque';
  @Input() healthInsurance = 'UNIMED';
  @Input() age = '24 anos';
  @Input() phone = '(48) 9 9911-9911';
  @Input() id = 1;
}
