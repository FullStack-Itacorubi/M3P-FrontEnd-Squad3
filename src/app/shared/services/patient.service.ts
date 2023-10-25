import { Injectable } from '@angular/core';

export interface patient {
  fullname: string;
  genre: string;
  birthdate: string;
  cpf: string;
  rg: string;
  civilStatus: string;
  placeOfBirth: string;
  email: string;
  phone: string;
  emergencyContact: string;
  allergyList: string;
  specificCareList: string;
  healthInsurance: string;
  healthInsuranceNumber: string;
  healthInsuranceValidity: string;
  publicPlace: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  complement: string;
  referencePoint: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  [x: string]: any;

  constructor() { }
}
