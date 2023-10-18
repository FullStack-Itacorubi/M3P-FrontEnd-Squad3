import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

interface Userinfos {
  fullname: FormControl<string | null>;
  genre: FormControl<string | null>;
  cpf: FormControl<string | null>;
  phone: FormControl<string | null>;
  type: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  formUserRegister: FormGroup<Userinfos> = new FormGroup({
    fullname: new FormControl(''),
    genre: new FormControl(''),
    cpf: new FormControl(''),
    phone: new FormControl(''),
    type: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm() {
    this.formUserRegister = new FormGroup({
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      genre: new FormControl('', [Validators.required]),
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

  registerUser() {
    if (!this.formUserRegister.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
    } else {
      alert('Dados cadastrado com sucesso!');
    }

    const user = {
      fullname: this.formUserRegister.value.fullname!,
      genre: this.formUserRegister.value.genre!,
      cpf: this.formUserRegister.value.cpf!,
      phone: this.formUserRegister.value.phone!,
      type: this.formUserRegister.value.type!,
      email: this.formUserRegister.value.email!,
      password: this.formUserRegister.value.password!,
    };

    this.initUserForm();
  }
}