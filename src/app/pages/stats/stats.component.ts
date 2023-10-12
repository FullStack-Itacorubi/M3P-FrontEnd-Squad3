import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent {
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

  select(updatedIdx: number) {
    this.menuOptions = this.menuOptions.map((opt, idx) => ({
      ...opt,
      selected: idx === updatedIdx,
    }));
  }
}
