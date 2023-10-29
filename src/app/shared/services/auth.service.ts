import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoginForm, LoginResponse, UserResetPassword } from '../utils/types';
import { AxiosService } from './axios.service';
import { AxiosInstance } from 'axios';
import { endpoints } from '../utils/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuthenticated?: LoginResponse;
  private client: AxiosInstance;

  constructor(private router: Router, private axiosService: AxiosService) {
    this.client = axiosService.getClient();
  }

  private async loginUser(user: LoginForm) {
    return await this.client.post('usuarios/login', user);
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

  async findUserByEmail(email: string) {
    return await this.client.get(`/${endpoints.user}/email`, {
      headers: {
        email: email,
      },
    });
  }

  async resetPassword(user: UserResetPassword) {
    await this.client.patch(`/${endpoints.user}/resetar-senha`, user);
  }
}
