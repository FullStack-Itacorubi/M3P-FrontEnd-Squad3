import { Injectable } from '@angular/core';

export interface user{
  fullname: string;
  genre: string;
  cpf: string;
  phone: string;
  type: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
}
