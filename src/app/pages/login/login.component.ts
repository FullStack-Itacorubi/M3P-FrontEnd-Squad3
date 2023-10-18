import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactAdminComponent } from 'src/app/components/contact-admin/contact-admin.component';
import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { IOptionsModal } from 'src/app/shared/interfaces/options-modal.interface';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
} )
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  options: IOptionsModal = {
    animations: {
      modal: {
        enter: 'enter-scaling 0.3s ease-out',
        // leave: 'fade-out 0.1s forwards',
        leave: 'fade-out 0.7s forwards',
      },
      overlay: {
        enter: 'fade-in 1s',
        // leave: 'fade-out 0.3s forwards',
        leave: 'fade-out 1.3s forwards',
      },
    },
    size: {
      // width: '40rem',
    },
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
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
        // updateOn: "blur",
        updateOn: "change",
      }
    );
  }

  /* get loginFormControl() {
    return this.loginForm.controls;
  } */

  onSubmit() {
    this.authService.makeLogin( this.loginForm.value );
    this.loginForm.reset();
  }

  goToContactAdmin() {
    this.modalService.open( ContactAdminComponent, this.options );
  }

  goToResetPassword() {
    // this.router.navigate( [ "/usuarios/esqueceu-senha" ] );
    /* this.modalService.open( ResetPasswordComponent, {
      animations: {
        modal: {
          enter: 'enter-scaling 0.3s ease-out',
          // leave: 'fade-out 0.1s forwards',
          leave: 'fade-out 0.7s forwards',
        },
        overlay: {
          enter: 'fade-in 1s',
          // leave: 'fade-out 0.3s forwards',
          leave: 'fade-out 1.3s forwards',
        },
      },
      size: {
        // width: '40rem',
      },
    } ); */
    this.modalService.open( ResetPasswordComponent, this.options );
  }
}
