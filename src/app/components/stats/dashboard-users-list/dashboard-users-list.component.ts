import { Component, Input } from '@angular/core';
import { Patient, User } from 'src/app/shared/utils/types';

export type StatsListStyle = 'TABLE' | 'GRID';

@Component({
  selector: 'app-dashboard-users-list',
  templateUrl: './dashboard-users-list.component.html',
  styleUrls: ['./dashboard-users-list.component.css'],
})
export class DashboardUsersListComponent {
  @Input() listStyle: StatsListStyle = 'GRID';
  @Input() data: Patient[] | User[] = [];

  isPatients() {
    if (this.data.length === 0) return;
    if (Object.hasOwn(this.data[0] as Patient, 'address')) return true;
    return false;
  }

  getPatients(): Patient[] {
    const patients = this.data as Patient[];
    return patients;
  }

  getUsers(): User[] {
    return this.data as User[];
  }
}
