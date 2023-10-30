import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css'],
})
export class TabMenuComponent {
  @Input() class = '';
  @Input() label = '';
  @Input() restricted?: 'ADMIN' | 'DOC';
  @Input() selected = false;
  @Output() select = new EventEmitter();

  constructor(private authService: AuthService) {}

  onClick() {
    this.select.emit();
  }

  checkRestriction() {
    if (!this.restricted) return true;
    if (this.restricted === 'ADMIN') return this.authService.isUserAdmin();
    return false;
  }
}
