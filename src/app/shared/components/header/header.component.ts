import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { IUserForm } from 'src/app/shared/interfaces/user.interface';
import { ToolbarService } from 'src/app/shared/services/toolbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  user!: IUserForm;
  title = 'Dashboard';

  constructor(
    private toolbarService: ToolbarService,
    router: Router,
    titleService: Title
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => (this.title = titleService.getTitle()));
      }
    });
  }

  ngOnInit(): void {
    this.user = this.toolbarService.getActivedUser();
  }
}
