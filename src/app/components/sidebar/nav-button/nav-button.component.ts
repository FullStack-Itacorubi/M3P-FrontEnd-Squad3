import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css'],
})
export class NavButtonComponent {
  @Input() text = '';
  @Input() icon = '';
  @Input() selected = false;
  @Input() collapsed = false;
  @Output() click = new EventEmitter();

  onClick() {
    this.click.emit();
  }
}