import { Component, OnInit } from '@angular/core';
import { StatsListStyle } from 'src/app/components/stats/dashboard-users-list/dashboard-users-list.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LabMedicalApiService } from 'src/app/shared/services/lab-medical-api.service';
import { endpoints } from 'src/app/shared/utils/endpoints';
import { Patient, User } from 'src/app/shared/utils/types';

type Stats = {
  title: string;
  value: number;
};

type StatsTabOption = {
  label: string;
  selected: boolean;
  restricted?: 'ADMIN';
};

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css', '../../app.component.css'],
})
export class StatsComponent implements OnInit {
  menuOptions: StatsTabOption[] = [
    {
      label: 'Pacientes',
      selected: true,
    },
    {
      label: 'Usuários',
      selected: false,
      restricted: 'ADMIN',
    },
  ];
  listStyle: StatsListStyle = 'GRID';

  stats: Stats[] = [];
  patients: Patient[] = [];
  users: User[] = [];

  patientSearchInput = '';
  userSearchInput = '';

  constructor(
    private labMedicalApiService: LabMedicalApiService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.stats = await this.labMedicalApiService.getAll(endpoints.stats);
    this.getPatients();
    this.getUsers();
  }

  select(updatedIdx: number) {
    this.menuOptions = this.menuOptions.map((opt, idx) => ({
      ...opt,
      selected: idx === updatedIdx,
    }));
  }

  onSearchInput(filter: string) {
    if (this.menuOptions[0].selected) this.getPatients(filter);
    else this.getUsers(filter);
  }

  isAdmin() {
    return this.authService.isUserAdmin();
  }

  private async getPatients(filter?: string) {
    this.patients = await this.labMedicalApiService.getAll(
      endpoints.patient,
      filter
    );
  }

  private async getUsers(filter?: string) {
    this.users = await this.labMedicalApiService.getAll(endpoints.user, filter);
  }
}
