import { Component } from '@angular/core';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {

  constructor(private toolbarService : ToolbarService) {}
  
  returnLogin() {
    this.toolbarService.logout();
  
  }
}
