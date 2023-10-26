import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-user-table-row',
  templateUrl: './user-table-row.component.html',
  styleUrls: ['./user-table-row.component.css'],
})
export class UserTableRowComponent {
  @Input() user?: User;
}
