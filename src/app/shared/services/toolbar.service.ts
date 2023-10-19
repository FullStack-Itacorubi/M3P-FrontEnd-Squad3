import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor(private router : Router) { }

  logout() {
    localStorage.removeItem("userLogged");

    this.router.navigate(["login"]);
  }

  getActivedUser() {
    const registeredUser = localStorage.getItem("userLogged") ?? "{}";

    const registeredUserParse = JSON.parse(registeredUser);

    return registeredUserParse; 
    
  }
}
