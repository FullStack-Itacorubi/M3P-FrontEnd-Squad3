import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserResetPassword } from 'src/app/shared/interfaces/user.interface';

import { ModalService } from 'src/app/shared/services/modal.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component( {
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: [ './reset-password.component.css' ]
} )
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  currentStep!: string;
  userResetPasword!: IUserResetPassword;

  constructor(
    private modalService: ModalService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup(
      {
        email: new FormControl(
          "",
          [
            Validators.required,
            Validators.email,
          ]
        ),
        password: new FormControl(
          "",
          [
            Validators.required,
            Validators.minLength( 6 )
          ]
        ),
      },
      {
        updateOn: "change",
      }
    );
    this.currentStep = "email";
  }

  onSubmit() {
    this.userResetPasword = {
      ...this.userResetPasword,
      password: this.resetPasswordForm.get( "password" )?.value,
    };
    this.userService.resetPassword(
      this.userResetPasword
    );
    this.resetPasswordForm.reset();
    this.modalService.close();
  }

  async validateEmail() {
    const userFound = await this.userService.findUserByEmail( this.resetPasswordForm.get( 'email' )?.value );
    // const userFound = await this.userService.getUser( this.resetPasswordForm.get( 'email' )?.value );
    console.log( { userFound } );
    this.userResetPasword = {
      ...userFound
    };

    this.currentStep = "password";
  }

  close() {
    this.modalService.close();
  }
}
