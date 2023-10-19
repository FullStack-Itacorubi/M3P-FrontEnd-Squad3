import { Component } from '@angular/core';

type Options = {
  text: string;
  icon: string;
  selected: boolean;
  link: string;
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  options: Options[] = [
    { text: 'Dashboard', icon: 'ionAnalytics', selected: true, link: '/' },
    {
      text: 'Pacientes',
      icon: 'ionPeople',
      selected: false,
      link: '/pacientes',
    },
    {
      text: 'Consultas',
      icon: 'ionCalendarClear',
      selected: false,
      link: '/consultas',
    },
    { text: 'Exames', icon: 'ionDocuments', selected: false, link: '/exames' },
    { text: 'Dietas', icon: 'ionFastFood', selected: false, link: '/dietas' },
    {
      text: 'Medicamentos',
      icon: 'ionBandage',
      selected: false,
      link: '/medicamentos',
    },
    {
      text: 'Exercícios',
      icon: 'ionBarbell',
      selected: false,
      link: '/exercicios',
    },
    {
      text: 'Prontuários',
      icon: 'ionIdCard',
      selected: false,
      link: '/prontuarios',
    },
  ];
  collapsed = false;

  select(selectedIdx: number) {
    this.options = this.options.map((opt, idx) => ({
      ...opt,
      selected: idx === selectedIdx,
    }));
  }
}
