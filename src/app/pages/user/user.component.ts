import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LabMedicalApiService } from 'src/app/shared/services/lab-medical-api.service';
import { endpoints } from 'src/app/shared/utils/endpoints';
import { User } from 'src/app/shared/utils/types';

const GenreTypeValues = {
  Cisgênero: 'CISGENDER',
  Transgênero: 'TRANSGENDER',
  'Não-binário': 'NONBINARY',
} as const;

type GenreType = 'Cisgênero' | 'Transgênero' | 'Não-binário';

const UserTypeValues = {
  Administrador: 'ADMINISTRATOR',
  Médico: 'DOCTOR',
  Enfermeiro: 'NURSE',
} as const;

type UserType = 'Administrador' | 'Médico' | 'Enfermeiro';

type Userinfos = {
  fullName: FormControl<string | null>;
  genre: FormControl<string | null>;
  status: FormControl<boolean | null>;
  cpf: FormControl<string | null>;
  phone: FormControl<string | null>;
  type: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
};

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  formUserRegister: FormGroup<Userinfos>;
  isCreating = true;
  isSelf = false;
  userId = -1;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private labMedicalApiService: LabMedicalApiService,
    private route: ActivatedRoute
  ) {
    this.formUserRegister = this.initUserForm();
    if (Object.hasOwn(route.snapshot.params, 'userId')) {
      this.isCreating = false;
      this.userId = route.snapshot.params['userId'];
      this.isSelf = +this.userId === authService.getUserId();
    }
  }

  async ngOnInit() {
    if (this.isCreating) return;

    const user = await this.labMedicalApiService.getById<User>(
      endpoints.user,
      this.userId
    );
    this.populateForm(user);
  }

  initUserForm() {
    return new FormGroup<Userinfos>({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      genre: new FormControl('', [Validators.required]),
      status: new FormControl({ value: true, disabled: true }, [
        Validators.required,
      ]),
      cpf: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  populateForm(user: User) {
    const genreType = user.genre as GenreType;
    const userType = user.type as UserType;
    this.formUserRegister.get('fullName')?.setValue(user.fullName);
    this.formUserRegister.get('genre')?.setValue(GenreTypeValues[genreType]);
    this.formUserRegister.get('status')?.setValue(user.status);
    this.formUserRegister.get('status')?.enable();
    this.formUserRegister.get('cpf')?.setValue(user.cpf);
    this.formUserRegister.get('cpf')?.disable();
    this.formUserRegister.get('phone')?.setValue(user.phone);
    this.formUserRegister.get('type')?.setValue(UserTypeValues[userType]);
    this.formUserRegister.get('email')?.setValue(user.email);
    this.formUserRegister.get('email')?.disable();
    this.formUserRegister.get('password')?.clearValidators();
    this.formUserRegister.get('password')?.updateValueAndValidity();
  }

  saveUser() {
    if (!this.formUserRegister.valid) {
      this.alertService.emit({
        text: 'Formulário inválido, por favor insira ou corrija seus dados!',
        // class: 'bg-red-600 text-white border-0',
      });
      return;
    }

    if (this.isCreating) {
      this.registerUser();
      return;
    }

    this.updateUser();
  }

  async deleteUser() {
    await this.labMedicalApiService.delete(endpoints.user, this.userId);
    this.alertService.emit({
      text: 'Usuário excluído com sucesso!',
    });
  }

  async registerUser() {
    const formatPhone = (phone: string) => {
      const ddd = phone.substring(0, 2);
      const isolated = phone.substring(2, 3);
      const firstFour = phone.substring(3, 7);
      const lastFour = phone.substring(7);
      return `(${ddd}) ${isolated} ${firstFour}-${lastFour}`;
    };

    const phoneFormated = formatPhone(this.formUserRegister.value.phone!);

    const user: User = {
      fullName: this.formUserRegister.value.fullName!,
      genre: this.formUserRegister.value.genre!,
      status: this.formUserRegister.value.status!,
      cpf: this.formUserRegister.value.cpf!,
      phone: phoneFormated,
      type: this.formUserRegister.value.type!,
      email: this.formUserRegister.value.email!,
      password: this.formUserRegister.value.password!,
    };

    await this.labMedicalApiService.save(endpoints.user, user);
    this.formUserRegister = this.initUserForm();
    this.alertService.emit({
      text: 'Usuário cadastrado com sucesso!',
    });
  }

  async updateUser() {
    const user: User = {
      id: this.userId,
      fullName: this.formUserRegister.value.fullName!,
      genre: this.formUserRegister.value.genre!,
      status: this.formUserRegister.value.status!,
      cpf: this.formUserRegister.get('cpf')?.value!,
      phone: this.formUserRegister.value.phone!,
      type: this.formUserRegister.value.type!,
      email: this.formUserRegister.value.email!,
      password: this.formUserRegister.value.password!,
    };

    await this.labMedicalApiService.update(endpoints.user, user, this.userId);
    this.alertService.emit({
      text: 'Usuário editado com sucesso!',
    });
  }
}
