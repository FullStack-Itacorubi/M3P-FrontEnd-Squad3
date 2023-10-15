import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { IUser } from '../interfaces/user.interface';

@Injectable( {
  providedIn: 'root'
} )
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  async getListUsers(): Promise<IUser[]> {
    return await lastValueFrom(
      this.httpClient.get<IUser[]>(
        "http://localhost:3000/usuarios"
      )
    );
  }

  async getUser( email: string ): Promise<IUser | undefined> {
    const usersList = await this.getListUsers();
    console.log( { usersList } );
    const userFound = usersList.find( item => item.email === email );

    return userFound;
  }

  async saveUser( user: IUser ): Promise<void> {
    await lastValueFrom(
      this.httpClient.post<IUser[]>(
        "http://localhost:3000/usuarios",
        user
      )
    );
  }
}
