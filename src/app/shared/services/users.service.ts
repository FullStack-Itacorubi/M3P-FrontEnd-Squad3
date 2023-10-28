import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../utils/environment';
import { LoginForm, User, UserResetPassword } from 'src/app/shared/utils/types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = environment.API_BASE_URL;

  constructor(/* private authService: AuthService */) {}

  private getUserId() {
    const userLoggedJson = localStorage.getItem('userLogged') ?? "";
    const userLogged = JSON.parse(userLoggedJson);
    return userLogged.id;
  }

  async getUsers(filter?: string) {
    const users = await axios.get<User[]>(`${this.baseUrl}/usuarios`);
    if (!filter) return users.data;
    return users.data.filter((user) =>
      user.fullName.toLowerCase().includes(filter)
    );
  }

  async saveUser(user: User) {
    await axios.post(`${this.baseUrl}/usuarios`, user, {
      headers: {
        // userId: this.authService.getUserId(),
        userId: this.getUserId(),
      },
    });
  }

  async getUserById(id: number) {
    return (await axios.get<User>(`${this.baseUrl}/usuarios/${id}`)).data;
  }

  async updateUser(user: User) {
    await axios.put(`${this.baseUrl}/usuarios/${user.id}`, user, {
      headers: {
        // userId: this.authService.getUserId(),
        userId: this.getUserId(),
      },
    });
  }

  async deleteUser(id: number) {
    await axios.delete(`${this.baseUrl}/usuarios/${id}`, {
      headers: {
        // userId: this.authService.getUserId(),
        userId: this.getUserId(),
      },
    });
  }

  async loginUser(user: LoginForm) {
    return await axios.post(`${this.baseUrl}/usuarios/login`, user);
  }

  async findUserByEmail(email: string) {
    return await axios.get(`${this.baseUrl}/usuarios/email`, {
      headers: {
        email: email,
      },
    });
  }

  async resetPassword(user: UserResetPassword) {
    await axios.patch(
      this.baseUrl + '/usuarios/resetar-senha',
      user
    );
  }
}
