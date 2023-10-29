import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoginForm, LoginResponse } from '../utils/types';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuthenticated?: LoginResponse;

  constructor(private router: Router, private axiosService: AxiosService) {}

  private async loginUser(user: LoginForm) {
    return await this.axiosService.getClient().post('usuarios/login', user);
  }

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
    const { data } = await this.loginUser(user);
    if (!data) return;

    const userLoggedString = JSON.stringify(data);
    localStorage.setItem('userLogged', userLoggedString);
    this.userAuthenticated = data;

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
