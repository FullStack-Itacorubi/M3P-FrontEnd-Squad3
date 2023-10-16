import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private patientService: PatientService) {}

  ngOnIniti(): void {
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
}
