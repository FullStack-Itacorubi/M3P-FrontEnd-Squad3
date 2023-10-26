import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

type Options = {
  text: string;
  icon: string;
  selected: boolean;
  link: string;
  restriction?: 'ADMIN' | 'DOCTOR';
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
      restriction: 'DOCTOR',
    },
    {
      text: 'Exames',
      icon: 'ionDocuments',
      selected: false,
      link: '/exames',
      restriction: 'DOCTOR',
    },
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
    {
      text: 'Usuários',
      icon: 'ionPerson',
      selected: false,
      link: '/usuarios',
      restriction: 'ADMIN',
    },
  ];
  collapsed = false;

  constructor(private route: Router, private authService: AuthService) {
    route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = '/' + event.url.substring(1).split('/')[0];

        this.options = this.options.map((opt) => ({
          ...opt,
          selected: opt.link === url,
        }));
      }
    });
  }

  checkRestrictions(role?: 'ADMIN' | 'DOCTOR') {
    if (!role) return true;
    if (role === 'ADMIN') return this.authService.isUserAdmin();
    if (role === 'DOCTOR') return this.authService.isUserDoctor();
    return false;
  }
}
