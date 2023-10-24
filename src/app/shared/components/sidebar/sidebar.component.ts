import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
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
    {
      text: 'Usuários',
      icon: 'ionPerson',
      selected: false,
      link: '/usuarios',
      restriction: 'ADMIN',
    },
  ];
  collapsed = false;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    const url = this.getUrl(route.snapshot);
    this.options = this.options.map((opt) => ({
      ...opt,
      selected: opt.link === url,
    }));
  }

  select(selectedIdx: number) {
    this.options = this.options.map((opt, idx) => ({
      ...opt,
      selected: idx === selectedIdx,
    }));
  }

  checkRestrictions(role?: 'ADMIN' | 'DOCTOR') {
    if (!role) return true;
    if (role === 'ADMIN') return this.authService.isUserAdmin();
    return false;
  }

  private getUrl(snapshot: ActivatedRouteSnapshot): string {
    let url = snapshot.url[0] ? snapshot.url[0].path : '';
    if (snapshot.children[0]) url += '/' + this.getUrl(snapshot.children[0]);
    return url;
  }
}
