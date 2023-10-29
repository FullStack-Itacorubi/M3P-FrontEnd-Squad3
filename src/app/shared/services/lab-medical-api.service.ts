import { Injectable } from '@angular/core';
import { AxiosInstance } from 'axios';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class LabMedicalApiService {
  private client: AxiosInstance;

  constructor(private axiosService: AxiosService) {
    this.client = axiosService.getClient();
  }

  async getAll<T>(endpoint: string, filter?: string): Promise<T[]> {
    const list = (await this.client.get<T[]>(`/${endpoint}`)).data;
    return list;
  }

  async getById<T>(endpoint: string, id: number): Promise<T> {
    const instance = (await this.client.get<T>(`/${endpoint}/${id}`)).data;
    return instance;
  }

  async save<T>(endpoint: string, instance: T): Promise<boolean> {
    try {
      await this.client.post(`/${endpoint}`, instance);
      return true;
    } catch (error) {
      return false;
    }
  }

  async update<T>(endpoint: string, instance: T, id: number): Promise<boolean> {
    try {
      await this.client.put(`/${endpoint}/${id}`, instance);
      return true;
    } catch (error) {
      return false;
    }
  }

  async delete(
    endpoint: string,
    id: number,
    patientId?: number
  ): Promise<boolean> {
    try {
      await this.client.delete(`/${endpoint}/${id}`, {
        headers: {
          patientId,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
