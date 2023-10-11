import { Component } from '@angular/core';

type Options = {
  text: string;
  icon: string;
  selected: boolean;
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  options: Options[] = [
    { text: 'Dashboard', icon: 'ionAnalytics', selected: true },
    { text: 'Pacientes', icon: 'ionPeople', selected: false },
    { text: 'Consultas', icon: 'ionCalendarClear', selected: false },
    { text: 'Exames', icon: 'ionDocuments', selected: false },
    { text: 'Dietas', icon: 'ionFastFood', selected: false },
    { text: 'Medicamentos', icon: 'ionBandage', selected: false },
    { text: 'Exercícios', icon: 'ionBarbell', selected: false },
    { text: 'Prontuários', icon: 'ionIdCard', selected: false },
  ];

  select(selectedIdx: number) {
    this.options = this.options.map((opt, idx) => ({
      ...opt,
      selected: idx === selectedIdx,
    }));
  }
}
