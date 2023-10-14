import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../utils/environment';
import { User } from 'src/app/utils/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = environment.API_BASE_URL;

  constructor() {}

  async getUsers(filter?: string) {
    const users = await axios.get<User[]>(`${this.baseUrl}/usuarios`);
    if (!filter) return users.data;
    return users.data.filter((user) =>
      user.fullName.toLowerCase().includes(filter)
    );
  }
}
