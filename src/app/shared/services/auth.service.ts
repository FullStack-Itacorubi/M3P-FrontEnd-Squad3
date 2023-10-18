import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { ILoginForm } from '../interfaces/login.interface';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  private userAuthenticated: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  isUserAuthenticated(): boolean {
    return this.userAuthenticated;
  }

  async makeLogin( user: ILoginForm ): Promise<void> {
    const userRegistered = await this.userService.getUser( user.email );

    if ( userRegistered === undefined ) {
      alert( 'Usuário não encontrado!' );

      return;
    }

    await this.userService
      .loginUser( user )
      .then( res => {
        const userLoggedString = JSON.stringify( res );

        localStorage.setItem( "userLogged", userLoggedString );
      } );

    this.userAuthenticated = true;

    this.router.navigate( [ "" ] );
  }

  makeLogout(): void {
    localStorage.removeItem( "userLogged" );

    this.userAuthenticated = false;

    this.router.navigate( [ "login" ] );
  }
}
