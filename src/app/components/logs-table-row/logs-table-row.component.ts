import { Component, Input } from '@angular/core';
import { Logs } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-logs-table-row',
  templateUrl: './logs-table-row.component.html',
  styleUrls: ['./logs-table-row.component.css']
})
export class LogsTableRowComponent {
  @Input() logs? : Logs;

}
