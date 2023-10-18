import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.interface';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user! : IUser;

  constructor(private toolbarService : ToolbarService) {}
  ngOnInit(): void {
    this.user = this.toolbarService.getActivedUser();
    
  }

}
