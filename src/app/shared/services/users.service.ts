import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../utils/environment';
import { User } from 'src/app/shared/utils/types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = environment.API_BASE_URL;

  constructor(private authService: AuthService) {}

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
        userId: this.authService.getUserId(),
      },
    });
  }

  async getUserById(id: number) {
    return (await axios.get<User>(`${this.baseUrl}/usuarios/${id}`)).data;
  }

  async updateUser(user: User) {
    await axios.put(`${this.baseUrl}/usuarios/${user.id}`, user, {
      headers: {
        userId: this.authService.getUserId(),
      },
    });
  }
}
