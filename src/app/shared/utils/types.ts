export type Patient = {
  id: number;
  fullName: string;
  genre: string;
  cpf: string;
  phone: string;
  email: string;
  birthday: string;
  rg: string;
  civilStatus: string;
  placeOfBirth: string;
  emergencyContact: string;
  allergyList?: string;
  specificCareList?: string;
  healthInsurance?: string;
  healthInsuranceNumber?: string;
  healthInsuranceValidity?: string;
  address: Address;
  status: boolean;
};

export type User = {
  id: number;
  email: string;
  password: string;
  cpf: string;
  status: boolean;
  fullName: string;
  genre: string;
  phone: string;
  type: string;
};

export type MedicalRecord = {
  id: number;
  patient: Patient;
};

type Address = {
  id: number;
  cep: string;
  city: string;
  state: string;
  publicPlace: string;
  number: string;
  complement?: string;
  neighborhood: string;
  referencePoint?: string;
};
