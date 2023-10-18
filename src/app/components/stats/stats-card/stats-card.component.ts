import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css'],
})
export class StatsCardComponent {
  @Input() label = 'Pacientes';
  @Input() value = 100;
}
