import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css'],
})
export class CustomButtonComponent {
  @Input() label = '';
  @Input() type = 'button';
  @Input() disabled = false;
  @Output() clickHandler = new EventEmitter();

  onClick() {
    this.clickHandler.emit();
  }
}
