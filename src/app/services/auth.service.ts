import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { ILogin } from '../interfaces/login.interface';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  private userAuthenticated: boolean = false;
  showMenuAndToolbar = new EventEmitter<boolean>();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  isUserAuthenticated(): boolean {
    return this.userAuthenticated;
  }

  async makeLogin( user: ILogin ): Promise<void> {
    const userRegistered = await this.userService.getUser( user.email );

    if ( userRegistered === undefined ) {
      alert( 'Usuário não encontrado!' );

      return;
    }

    const userLogged = {
      id: userRegistered.id,
      name: userRegistered.name,
      email: userRegistered.email,
      isLogged: true,
    };

    if (
      userRegistered?.email === user.email &&
      userRegistered?.password === user.password
    ) {
      const userLoggedString = JSON.stringify( userLogged );
      localStorage.setItem( "userLogged", userLoggedString );

      this.userAuthenticated = true;

      this.showMenuAndToolbar.emit( true );

      this.router.navigate( [ "inicio" ] );
    } else {
      this.userAuthenticated = false;

      this.showMenuAndToolbar.emit( false );
    }
  }

  makeLogout(): void {
    localStorage.removeItem( "userLogged" );

    this.userAuthenticated = false;

    this.showMenuAndToolbar.emit( false );

    this.router.navigate( [ "login" ] );
  }
}
