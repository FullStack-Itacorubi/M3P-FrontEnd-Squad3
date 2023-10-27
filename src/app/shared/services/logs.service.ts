import { Injectable } from '@angular/core';
import { environment } from '../utils/environment';
import axios from 'axios';
import { Logs } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private baseUrl = environment.API_BASE_URL;
  
  constructor() { }

  async getLogs(){
    await axios.get<Logs[]>(`${this.baseUrl}/logs`);
  }

}
