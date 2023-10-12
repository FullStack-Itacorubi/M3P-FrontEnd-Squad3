import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

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
  stats: Stats[] = [];

  constructor(private statsService: StatsService) {}

  async ngOnInit() {
    const { data } = await this.statsService.getStats();
    Object.keys(data).map((k) => this.stats.push({ label: k, value: data[k] }));
  }

  select(updatedIdx: number) {
    this.menuOptions = this.menuOptions.map((opt, idx) => ({
      ...opt,
      selected: idx === updatedIdx,
    }));
  }
}
