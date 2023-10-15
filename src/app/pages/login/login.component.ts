import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
} )
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
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
        updateOn: "blur",
      }
    );
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authService.makeLogin( this.loginForm.value );
    this.loginForm.reset();
  }

  goToResetPassword() {
    this.router.navigate( [ "/usuarios/esqueceu-senha" ] );
  }
}
