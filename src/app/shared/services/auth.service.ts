import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { ILoginForm, ILoginResponse } from '../interfaces/login.interface';
import { User } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuthenticated?: ILoginResponse;

  constructor(private userService: UserService, private router: Router) {}

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

  async makeLogin(user: ILoginForm): Promise<void> {
    const userRegistered = await this.userService.getUser(user.email);

    if (userRegistered === undefined) {
      alert('Usuário não encontrado!');

      return;
    }

    await this.userService.loginUser(user).then((res) => {
      const userLoggedString = JSON.stringify(res);

      localStorage.setItem('userLogged', userLoggedString);
      this.userAuthenticated = res;
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
}
