import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from './users.service';
import { LoginForm, LoginResponse } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuthenticated?: LoginResponse;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  isUserAuthenticated(): boolean {
    if (!this.userAuthenticated) this.checkConnection();
    return !!this.userAuthenticated;
  }

  isUserAdmin(): boolean {
    return this.userAuthenticated?.type.toLowerCase() === 'administrador';
  }

  isUserDoctor(): boolean {
    return (
      this.userAuthenticated?.type.toLowerCase() === 'médico' ||
      this.isUserAdmin()
    );
  }

  async makeLogin(user: LoginForm): Promise<void> {
    const res = await this.usersService.loginUser(user);
    const userLoggedString = JSON.stringify(res.data);

      localStorage.setItem('userLogged', userLoggedString);
      this.userAuthenticated = res.data;
    });

    this.router.navigate(['']);
  }

  makeLogout(): void {
    localStorage.removeItem('userLogged');

    this.userAuthenticated = undefined;

    this.router.navigate(['login']);
  }

  checkConnection() {
    const userStr = localStorage.getItem('userLogged');
    if (!userStr) return;
    this.userAuthenticated = JSON.parse(userStr);
  }

  getUserId() {
    return this.userAuthenticated?.id;
  }
}
