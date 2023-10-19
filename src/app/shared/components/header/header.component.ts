import { Component, OnInit } from '@angular/core';
import { IUserForm } from 'src/app/shared/interfaces/user.interface';
import { ToolbarService } from 'src/app/shared/services/toolbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user!: IUserForm;

  constructor(private toolbarService: ToolbarService) {}
  ngOnInit(): void {
    this.user = this.toolbarService.getActivedUser();
  }
}
