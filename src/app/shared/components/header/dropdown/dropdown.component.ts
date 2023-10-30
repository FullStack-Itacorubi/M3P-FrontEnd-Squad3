import { Component } from '@angular/core';
import { ToolbarService } from 'src/app/shared/services/toolbar.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  visible = false;
  clickListening = false;

  constructor(private toolbarService: ToolbarService) {
    window.document.addEventListener('click', (event) => {
      if (this.visible && !this.clickListening) {
        this.clickListening = true;
        return;
      }

      if (this.visible && this.clickListening) {
        this.visible = false;
        this.clickListening = false;
      }
    });
  }

  returnLogin() {
    this.toolbarService.logout();
  }
}
