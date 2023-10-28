import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../utils/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axiosClient: AxiosInstance;

  constructor(private authService: AuthService) {
    this.axiosClient = axios.create({ baseURL: environment.API_BASE_URL });

    this.axiosClient.interceptors.request.use((config) => {
      config.headers['userId'] = this.authService.getUserId();
      return config;
    });

    this.axiosClient.interceptors.response.use(
      (res) => res,
      (err) => {
        alert(err.response.data.message);
        return err;
      }
    );
  }

  getClient() {
    return this.axiosClient;
  }
}
