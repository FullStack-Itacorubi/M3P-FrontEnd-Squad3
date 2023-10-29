import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CepService } from 'src/app/shared/services/cep.service';
import { PatientsService } from 'src/app/shared/services/patients.service';
import { Patient } from 'src/app/shared/utils/types';

const GenreTypeValues = {
  Cisgênero: 'CISGENDER',
  Transgênero: 'TRANSGENDER',
  'Não-binário': 'NONBINARY',
} as const;

type GenreType = 'Cisgênero' | 'Transgênero' | 'Não-binário';

const CivilStatusTypeValues = {
  'Solteiro(a)': 'SINGLE',
  'Casado(a)': 'MARRIED',
  'Separado(a)': 'SEPARATED',
  'Divorciado(a)': 'DIVORCED',
  'Viúvo(a)': 'WIDOWER',
} as const;

type CivilStatusType =
  | 'Solteiro(a)'
  | 'Casado(a)'
  | 'Separado(a)'
  | 'Divorciado(a)'
  | 'Viúvo(a)';

type Patientinfos = {
  fullName: FormControl<string | null>;
  genre: FormControl<string | null>;
  birthday: FormControl<string | null>;
  cpf: FormControl<string | null>;
  rg: FormControl<string | null>;
  civilStatus: FormControl<string | null>;
  placeOfBirth: FormControl<string | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
  status: FormControl<boolean | null>;
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
};

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css', '../../app.component.css'],
})
export class PatientComponent implements OnInit {
  formPatientRegister: FormGroup<Patientinfos>;
  isCreating = true;
  patientId = -1;

  constructor(
    private alertService: AlertService,
    private patientsService: PatientsService,
    private cepService: CepService,
    private route: ActivatedRoute
  ) {
    this.formPatientRegister = this.initPatientForm();
    if (Object.hasOwn(route.snapshot.params, 'patientId')) {
      this.isCreating = false;
      this.patientId = route.snapshot.params['patientId'];
    }
  }

  async ngOnInit() {
    if (this.isCreating) return;

    const patient = await this.patientsService.getPatientById(this.patientId);
    this.populateForm(patient);
  }

  initPatientForm() {
    return new FormGroup<Patientinfos>({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      genre: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      civilStatus: new FormControl('', [Validators.required]),
      placeOfBirth: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl({ value: true, disabled: true }, [
        Validators.required,
      ]),
      phone: new FormControl('', [Validators.required]),
      emergencyContact: new FormControl('', [Validators.required]),
      allergyList: new FormControl(''),
      specificCareList: new FormControl(''),
      healthInsurance: new FormControl(''),
      healthInsuranceNumber: new FormControl(''),
      healthInsuranceValidity: new FormControl(null),
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

  populateForm(patient: Patient) {
    const genreType = patient.genre as GenreType;
    const civilStatusType = patient.civilStatus as CivilStatusType;
    this.formPatientRegister.get('fullName')?.setValue(patient.fullName);
    this.formPatientRegister.get('genre')?.setValue(GenreTypeValues[genreType]);
    this.formPatientRegister
      .get('birthday')
      ?.setValue(patient.birthday.split('/').reverse().join('-'));
    this.formPatientRegister.get('cpf')?.setValue(patient.cpf);
    this.formPatientRegister.get('cpf')?.disable();
    this.formPatientRegister.get('rg')?.setValue(patient.rg);
    this.formPatientRegister
      .get('civilStatus')
      ?.setValue(CivilStatusTypeValues[civilStatusType]);
    this.formPatientRegister
      .get('placeOfBirth')
      ?.setValue(patient.placeOfBirth);
    this.formPatientRegister.get('email')?.setValue(patient.email);
    this.formPatientRegister.get('status')?.setValue(patient.status);
    this.formPatientRegister.get('status')?.enable();
    this.formPatientRegister.get('phone')?.setValue(patient.phone);
    this.formPatientRegister
      .get('emergencyContact')
      ?.setValue(patient.emergencyContact);
    this.formPatientRegister
      .get('allergyList')
      ?.setValue(patient.allergyList ?? null);
    this.formPatientRegister
      .get('specificCareList')
      ?.setValue(patient.specificCareList ?? null);
    this.formPatientRegister
      .get('healthInsurance')
      ?.setValue(patient.healthInsurance ?? null);
    this.formPatientRegister
      .get('healthInsuranceNumber')
      ?.setValue(patient.healthInsuranceNumber ?? null);
    this.formPatientRegister
      .get('healthInsuranceValidity')
      ?.setValue(
        patient.healthInsuranceValidity
          ? patient.healthInsuranceValidity
              .split('/')
              .slice(1)
              .reverse()
              .join('-')
          : null
      );
    this.formPatientRegister
      .get('publicPlace')
      ?.setValue(patient.address.publicPlace);
    this.formPatientRegister.get('number')?.setValue(patient.address.number);
    this.formPatientRegister
      .get('neighborhood')
      ?.setValue(patient.address.neighborhood);
    this.formPatientRegister.get('city')?.setValue(patient.address.city);
    this.formPatientRegister.get('state')?.setValue(patient.address.state);
    this.formPatientRegister.get('cep')?.setValue(patient.address.cep);
    this.formPatientRegister
      .get('complement')
      ?.setValue(patient.address.complement ?? null);
    this.formPatientRegister
      .get('referencePoint')
      ?.setValue(patient.address.referencePoint ?? null);
  }

  savePatient() {
    if (!this.formPatientRegister.valid) {
      this.alertService.emit({
        text: 'Formulário inválido, por favor insira ou corrija seus dados!',
        class: 'bg-red-600 text-white border-0',
      });
      return;
    }

    if (this.isCreating) {
      this.registerPatient();
      return;
    }

    this.updatePatient();
  }

  async deletePatient() {
    await this.patientsService.deletePatient(this.patientId);
    this.alertService.emit({
      text: 'Paciente excluído com sucesso!',
    });
  }

  async registerPatient() {
    const formatDate = (date: string) => {
      return date.split('-').reverse().join('/');
    };

    const birthdayFormated = formatDate(
      this.formPatientRegister.value.birthday!
    );

    const formatValidityDate = (date: string) => {
      const dateParts = date.split('-').reverse();
      dateParts[1] = dateParts[1].slice(2);
      return dateParts.join('/');
    };

    let healthInsuranceValidityFormated;
    if (this.formPatientRegister.value.healthInsuranceValidity) {
      healthInsuranceValidityFormated = formatValidityDate(
        this.formPatientRegister.value.healthInsuranceValidity!
      );
    }

    const formatPhone = (phone: string) => {
      const ddd = phone.substring(0, 2);
      const isolated = phone.substring(2, 3);
      const firstFour = phone.substring(3, 7);
      const lastFour = phone.substring(7);
      return `(${ddd}) ${isolated} ${firstFour}-${lastFour}`;
    };

    const phoneFormated = formatPhone(this.formPatientRegister.value.phone!);

    const emergencyContactFormated = formatPhone(
      this.formPatientRegister.value.emergencyContact!
    );

    const formatCep = (cep: string) => {
      const prefix = cep.substring(0, 5);
      const sufix = cep.substring(5);

      return `${prefix}-${sufix}`;
    };

    const cepFormated = formatCep(this.formPatientRegister.value.cep!);

    const patient: Patient = {
      fullName: this.formPatientRegister.value.fullName!,
      genre: this.formPatientRegister.value.genre!,
      birthday: birthdayFormated,
      cpf: this.formPatientRegister.value.cpf!,
      rg: this.formPatientRegister.value.rg!,
      civilStatus: this.formPatientRegister.value.civilStatus!,
      placeOfBirth: this.formPatientRegister.value.placeOfBirth!,
      email: this.formPatientRegister.value.email!,
      status: this.formPatientRegister.value.status!,
      phone: phoneFormated,
      emergencyContact: emergencyContactFormated,
      allergyList: this.formPatientRegister.value.allergyList!,
      specificCareList: this.formPatientRegister.value.specificCareList!,
      healthInsurance: this.formPatientRegister.value.healthInsurance!,
      healthInsuranceNumber:
        this.formPatientRegister.value.healthInsuranceNumber!,
      healthInsuranceValidity: healthInsuranceValidityFormated,
      address: {
        publicPlace: this.formPatientRegister.value.publicPlace!,
        number: this.formPatientRegister.value.number!,
        neighborhood: this.formPatientRegister.value.neighborhood!,
        city: this.formPatientRegister.value.city!,
        state: this.formPatientRegister.value.state!,
        cep: cepFormated,
        complement: this.formPatientRegister.value.complement!,
        referencePoint: this.formPatientRegister.value.referencePoint!,
      },
    };

    await this.patientsService.savePatient(patient);
    this.formPatientRegister = this.initPatientForm();
    this.alertService.emit({
      text: 'Paciente cadastrado com sucesso!',
    });
  }

  async updatePatient() {
    const formatDate = (date: string) => {
      return date.split('-').reverse().join('/');
    };

    const birthdayFormated = formatDate(
      this.formPatientRegister.value.birthday!
    );

    const formatValidityDate = (date: string) => {
      const dateParts = date.split('-').reverse();
      dateParts[1] = dateParts[1].slice(2);
      return dateParts.join('/');
    };

    let healthInsuranceValidityFormated;
    if (this.formPatientRegister.value.healthInsuranceValidity) {
      healthInsuranceValidityFormated = formatValidityDate(
        this.formPatientRegister.value.healthInsuranceValidity!
      );
    }

    const patient: Patient = {
      id: this.patientId,
      fullName: this.formPatientRegister.value.fullName!,
      genre: this.formPatientRegister.value.genre!,
      birthday: birthdayFormated,
      cpf: this.formPatientRegister.get('cpf')?.value!,
      rg: this.formPatientRegister.value.rg!,
      civilStatus: this.formPatientRegister.value.civilStatus!,
      placeOfBirth: this.formPatientRegister.value.placeOfBirth!,
      email: this.formPatientRegister.value.email!,
      status: this.formPatientRegister.value.status!,
      phone: this.formPatientRegister.value.phone!,
      emergencyContact: this.formPatientRegister.value.emergencyContact!,
      allergyList: this.formPatientRegister.value.allergyList!,
      specificCareList: this.formPatientRegister.value.specificCareList!,
      healthInsurance: this.formPatientRegister.value.healthInsurance!,
      healthInsuranceNumber:
        this.formPatientRegister.value.healthInsuranceNumber!,
      healthInsuranceValidity: healthInsuranceValidityFormated,
      address: {
        publicPlace: this.formPatientRegister.value.publicPlace!,
        number: this.formPatientRegister.value.number!,
        neighborhood: this.formPatientRegister.value.neighborhood!,
        city: this.formPatientRegister.value.city!,
        state: this.formPatientRegister.value.state!,
        cep: this.formPatientRegister.value.cep!,
        complement: this.formPatientRegister.value.complement!,
        referencePoint: this.formPatientRegister.value.referencePoint!,
      },
    };

    await this.patientsService.updatePatient(patient);
    this.alertService.emit({
      text: 'Paciente editado com sucesso!',
    });
  }

  checkCep() {
    const cep = this.formPatientRegister.get('cep')?.value;
    if (cep) {
      this.cepService
        .search(cep)
        .subscribe((data) => this.populateAddress(data));
    }
  }

  private populateAddress(data: any) {
    this.formPatientRegister.patchValue({
      publicPlace: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    });
  }
}
