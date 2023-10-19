import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom, throwError } from 'rxjs';

import {
  IUserForm,
  IUserResetPassword,
  IUserResponse,
} from '../interfaces/user.interface';
import { ILoginForm, ILoginResponse } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url: string = 'http://localhost:8080/api/usuarios';

  constructor(private httpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);

    return throwError(() => new Error(errorMessage));
  }

  async getListUsers(): Promise<IUserResponse[]> {
    return await lastValueFrom(this.httpClient.get<IUserResponse[]>(this._url));
  }

  async getUser(email: string): Promise<IUserResponse | undefined> {
    const usersList = await this.getListUsers();
    const userFound = usersList.find((item) => item.email === email);

    return userFound;
  }

  async saveUser(user: IUserForm): Promise<void> {
    await lastValueFrom(this.httpClient.post<IUserForm>(this._url, user));
  }

  async loginUser(user: ILoginForm): Promise<ILoginResponse> {
    return await lastValueFrom(
      this.httpClient.post<ILoginResponse>(this._url + '/login', user)
    );
  }

  async findUserByEmail(email: string): Promise<IUserResetPassword> {
    return await lastValueFrom(
      this.httpClient.get<IUserResetPassword>(this._url + '/email', {
        headers: {
          email: email,
        },
      })
    );
  }

  async resetPassword(user: IUserResetPassword): Promise<void> {
    await lastValueFrom(
      this.httpClient.patch<IUserResetPassword>(
        this._url + '/resetar-senha',
        user
      )
    );
  }
}
