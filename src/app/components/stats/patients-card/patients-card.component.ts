import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-patients-card',
  templateUrl: './patients-card.component.html',
  styleUrls: ['./patients-card.component.css'],
})
export class PatientsCardComponent {
  @Input() name = '';
  @Input() healthInsurance = '';
  @Input() age?: string;
  @Input() phone = '';
}
