import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../utils/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = environment.API_BASE_URL;

  constructor() {}

  getUsers() {
    return axios.get(`${this.baseUrl}/usuarios`);
  }
}
