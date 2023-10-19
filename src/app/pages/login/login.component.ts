import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { IOptionsModal } from 'src/app/shared/interfaces/options-modal.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ContactAdminComponent } from 'src/app/components/contact-admin/contact-admin.component';
import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';

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
        leave: 'fade-out 0.7s forwards',
      },
      overlay: {
        enter: 'fade-in 1s',
        leave: 'fade-out 1.3s forwards',
      },
    },
    size: {
      // width: '40rem',
    },
  };

  constructor(
    private authService: AuthService,
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
        updateOn: "change",
      }
    );
  }

  onSubmit() {
    this.authService.makeLogin( this.loginForm.value );
  }

  goToContactAdmin() {
    this.modalService.open( ContactAdminComponent, this.options );
  }

  goToResetPassword() {
    this.modalService.open( ResetPasswordComponent, this.options );
  }
}
