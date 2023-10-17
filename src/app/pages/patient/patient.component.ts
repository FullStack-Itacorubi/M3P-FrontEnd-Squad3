import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';
import { PatientService } from 'src/app/services/patient.service';

interface Patientinfos {
  fullname: FormControl<string | null>;
  genre: FormControl<string | null>;
  birthdate: FormControl<string | null>;
  cpf: FormControl<string | null>;
  rg: FormControl<string | null>;
  civilStatus: FormControl<string | null>;
  placeOfBirth: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  emergencyContact: FormControl<string | null>;
  allergyList: FormControl<string | null>;
  specificCareList: FormControl<string | null>;
  healthInsurance: FormControl<string | null>;
  healthInsuranceNumber: FormControl<string | null>;
  healthInsuranceValidity: FormControl<string | null>;
  publicPlace: FormControl<string | null>;
  number: FormControl<string | null>;
  neighborhood: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  cep: FormControl<string | null>;
  complement: FormControl<string | null>;
  referencePoint: FormControl<string | null>;
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent {
  formPatientRegister: FormGroup<Patientinfos> = new FormGroup({
    fullname: new FormControl(''),
    genre: new FormControl(''),
    birthdate: new FormControl(''),
    cpf: new FormControl(''),
    rg: new FormControl(''),
    civilStatus: new FormControl(''),
    placeOfBirth: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    emergencyContact: new FormControl(''),
    allergyList: new FormControl(''),
    specificCareList: new FormControl(''),
    healthInsurance: new FormControl(''),
    healthInsuranceNumber: new FormControl(''),
    healthInsuranceValidity: new FormControl(''),
    publicPlace: new FormControl(''),
    number: new FormControl(''),
    neighborhood: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    cep: new FormControl(''),
    complement: new FormControl(''),
    referencePoint: new FormControl(''),
  });

  constructor(
    private patientService: PatientService,
    private cepService: CepService
  ) {}

  checkCep() {
    const cep = this.formPatientRegister.get('cep')?.value;
    console.log(cep) 
    if (cep) {
      this.cepService.search(cep).subscribe((data) => this.populaForm(data));
    }
  }

  populaForm(data: any) {
    console.log(data)
    this.formPatientRegister.patchValue({
      publicPlace: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    });
  }

  ngOnInit(): void {
    this.initPatientForm();
  }

  initPatientForm() {
    this.formPatientRegister = new FormGroup({
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      genre: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      civilStatus: new FormControl('', [Validators.required]),
      placeOfBirth: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      emergencyContact: new FormControl('', [Validators.required]),
      allergyList: new FormControl(''),
      specificCareList: new FormControl(''),
      healthInsurance: new FormControl(''),
      healthInsuranceNumber: new FormControl(''),
      healthInsuranceValidity: new FormControl(''),
      publicPlace: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      neighborhood: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      complement: new FormControl(''),
      referencePoint: new FormControl(''),
    });
  }

  registerPatient() {
    if (!this.formPatientRegister.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
    } else {
      alert('Dados cadastrado com sucesso!');
    }

    const patient = {
      fullname: this.formPatientRegister.value.fullname!,
      genre: this.formPatientRegister.value.genre!,
      birthdate: this.formPatientRegister.value.birthdate!,
      cpf: this.formPatientRegister.value.cpf!,
      rg: this.formPatientRegister.value.rg!,
      civilStatus: this.formPatientRegister.value.civilStatus!,
      placeOfBirth: this.formPatientRegister.value.placeOfBirth!,
      email: this.formPatientRegister.value.email!,
      phone: this.formPatientRegister.value.phone!,
      emergencyContact: this.formPatientRegister.value.emergencyContact!,
      allergyList: this.formPatientRegister.value.allergyList!,
      specificCareList: this.formPatientRegister.value.specificCareList!,
      healthInsurance: this.formPatientRegister.value.healthInsurance!,
      healthInsuranceNumber:
        this.formPatientRegister.value.healthInsuranceNumber!,
      healthInsuranceValidity:
        this.formPatientRegister.value.healthInsuranceValidity!,
      publicPlace: this.formPatientRegister.value.publicPlace!,
      number: this.formPatientRegister.value.number!,
      neighborhood: this.formPatientRegister.value.neighborhood!,
      city: this.formPatientRegister.value.city!,
      state: this.formPatientRegister.value.state!,
      cep: this.formPatientRegister.value.cep!,
      complement: this.formPatientRegister.value.complement!,
      referencePoint: this.formPatientRegister.value.referencePoint!,
    };

    this.initPatientForm();
  }
}
