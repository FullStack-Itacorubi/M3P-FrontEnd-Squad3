import { Component, OnInit } from '@angular/core';
import { StatsListStyle } from 'src/app/components/stats/stats-list/stats-list.component';
import { PatientsService } from 'src/app/services/patients.service';
import { StatsService } from 'src/app/services/stats.service';
import { UsersService } from 'src/app/services/users.service';
import { Patient, User } from 'src/app/utils/types';

type Stats = {
  label: string;
  value: number;
};

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  menuOptions = [
    {
      label: 'Pacientes',
      selected: true,
    },
    {
      label: 'Usuário',
      selected: false,
    },
  ];
  listStyle: StatsListStyle = 'GRID';

  stats: Stats[] = [];
  patients: Patient[] = [];
  users: User[] = [];

  constructor(
    private statsService: StatsService,
    private patientsService: PatientsService,
    private usersService: UsersService
  ) {}

  async ngOnInit() {
    const statsData = await this.statsService.getStats();
    this.stats = statsData.data;
    const patientsData = await this.patientsService.getPatients();
    this.patients = patientsData.data;
    const usersData = await this.usersService.getUsers();
    this.users = usersData.data;
  }

  select(updatedIdx: number) {
    this.menuOptions = this.menuOptions.map((opt, idx) => ({
      ...opt,
      selected: idx === updatedIdx,
    }));
  }
}
