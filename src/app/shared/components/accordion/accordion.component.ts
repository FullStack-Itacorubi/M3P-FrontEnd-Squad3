import { Component, Input } from '@angular/core';

type IconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent {
  @Input() headerTitle?: string;
  @Input() headerIcon?: string;
  @Input() iconSize?: IconSize;
  @Input() bordered?: boolean;
  open = false;
}
