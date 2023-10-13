import { Component, OnInit } from '@angular/core';
import { StatsListStyle } from 'src/app/components/stats/stats-list/stats-list.component';
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
  listStyle: StatsListStyle = 'TABLE';

  stats: Stats[] = [];
  patients = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  users = [1, 1, 1, 1, 1];

  constructor(private statsService: StatsService) {}

  async ngOnInit() {
    const { data } = await this.statsService.getStats();
    this.stats = data as Stats[];
  }

  select(updatedIdx: number) {
    this.menuOptions = this.menuOptions.map((opt, idx) => ({
      ...opt,
      selected: idx === updatedIdx,
    }));
  }
}
