import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UserResetPassword } from 'src/app/shared/utils/types';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  currentStep!: string;
  userResetPassword!: UserResetPassword;

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        updateOn: 'change',
      }
    );
    this.currentStep = 'email';
  }

  onSubmit() {
    this.userResetPassword = {
      ...this.userResetPassword,
      password: this.resetPasswordForm.get('password')?.value,
    };
    this.authService.resetPassword(this.userResetPassword);
    this.resetPasswordForm.reset();
    this.modalService.close();
  }

  async validateEmail() {
    const userFound = await this.authService.findUserByEmail(
      this.resetPasswordForm.get('email')?.value
    );
    console.log({ userFound: userFound['data'] });
    this.userResetPassword = {
      ...userFound.data,
    };

    this.currentStep = 'password';
  }

  close() {
    this.modalService.close();
  }
}
