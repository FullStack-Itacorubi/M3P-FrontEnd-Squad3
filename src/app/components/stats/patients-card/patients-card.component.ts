import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-patients-card',
  templateUrl: './patients-card.component.html',
  styleUrls: ['./patients-card.component.css'],
})
export class PatientsCardComponent {
  @Input() name = 'Joaquim da Silva Santos Albuquerque';
  @Input() healthInsurance = 'UNIMED';
  @Input() age = '24 anos';
  @Input() phone = '(48) 9 9911-9911';
}
