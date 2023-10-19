import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css'],
})
export class TabMenuComponent {
  @Input() class = '';
  @Input() label = '';
  @Input() selected = false;
  @Output() select = new EventEmitter();

  onClick() {
    this.select.emit();
  }
}
