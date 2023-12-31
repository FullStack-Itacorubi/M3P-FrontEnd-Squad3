export type Patient = {
  id?: number;
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
  id?: number;
  email: string;
  password: string;
  cpf: string;
  status: boolean;
  fullName: string;
  genre: string;
  phone: string;
  type: string;
};

export type Exam = {
  id?: number;
  patientId: number;
  examName: string;
  examDate: string;
  examHour: string;
  examType: string;
  laboratory: string;
  documentUrl?: string;
  results: string;
  status: boolean;
};

export type Diet = {
  id?: number;
  patientId: number;
  dietName: string;
  dietDate: string;
  dietTime: string;
  type: string;
  description: string;
  status: boolean;
};

export type Exercise = {
  id?: number;
  patientId: number;
  name: string;
  date: string;
  time: string;
  type: string;
  weeklyAmount: number;
  description: string;
  status: boolean;
};

export type Medicament = {
  id?: number;
  name: string;
  date?: string;
  time?: string;
  type: string;
  quantity: number;
  unit: string;
  observations: string;
  status: boolean;
};

export type QueryMedicament = {
  id: number;
};

export type QueryResponse = {
  id?: number;
  patientId: number;
  reasonForConsultation: string;
  consultationDate: string;
  consultationTime: string;
  problemDescription: string;
  medicaments: Medicament[];
  dosageAndRecautions: string;
  status: boolean;
};

export type QueryRequest = {
  id?: number;
  patientId: number;
  reasonForConsultation: string;
  consultationDate: string;
  consultationTime: string;
  problemDescription: string;
  medicaments: Medicament[] | QueryMedicament[];
  dosageAndRecautions: string;
  status: boolean;
};

export type MedicalRecord = {
  id: number;
  patient: Patient;
  queries: QueryResponse[];
  exercises: Exercise[];
  diets: Diet[];
  exams: Exam[];
};

type Address = {
  id?: number;
  cep: string;
  city: string;
  state: string;
  publicPlace: string;
  number: string;
  complement?: string;
  neighborhood: string;
  referencePoint?: string;
};

export type Logs = {
  message: string;
  timestamp: string;

}

export type UserResetPassword = {
  // id: User[ "id" ];
  id: number;
  email: User["email"];
  password: User["password"];
};

export type LoginForm = {
  email: User["email"];
  password: User["password"];
};

export type LoginResponse = {
  id: UserResetPassword["id"];
  fullName: User["fullName"];
  email: User["email"];
  type: User["type"];
};

export type OptionsModal = {
  animations?: {
    modal?: {
      enter?: string;
      leave?: string;
    };
    overlay?: {
      enter?: string;
      leave?: string;
    };
  };
  size?: {
    minWidth?: string;
    width?: string;
    maxWidth?: string;
    minHeight?: string;
    height?: string;
    maxHeight?: string;
  };
}
