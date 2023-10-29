import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../utils/environment';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axiosClient: AxiosInstance;

  private getUserId() {
    const userLoggedJson = localStorage.getItem('userLogged') ?? "{}";
    const userLogged = JSON.parse(userLoggedJson);
    return userLogged.id;
  }

  constructor() {
    this.axiosClient = axios.create({ baseURL: environment.API_BASE_URL });

    this.axiosClient.interceptors.request.use((config) => {
      config.headers['userId'] = this.getUserId() ?? "";
      return config;
    });

    this.axiosClient.interceptors.response.use(
      (res) => res,
      (err) => {
        console.log({Error: err});

        alert(err.response.data.message);
        return err;
      }
    );
  }

  getClient() {
    return this.axiosClient;
  }
}
