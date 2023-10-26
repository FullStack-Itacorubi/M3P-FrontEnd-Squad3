import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/shared/services/cep.service';
import { PatientsService } from 'src/app/shared/services/patients.service';
import { Patient } from 'src/app/shared/utils/types';

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
export class PatientComponent {
  formPatientRegister: FormGroup<Patientinfos>;

  constructor(
    private patientsService: PatientsService,
    private cepService: CepService
  ) {
    this.formPatientRegister = this.initPatientForm();
  }

  checkCep() {
    const cep = this.formPatientRegister.get('cep')?.value;
    console.log(cep);
    if (cep) {
      this.cepService.search(cep).subscribe((data) => this.populaForm(data));
    }
  }

  populaForm(data: any) {
    console.log(data);
    this.formPatientRegister.patchValue({
      publicPlace: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    });
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
      status: new FormControl({ value: true, disabled: true }),
      phone: new FormControl('', [Validators.required]),
      emergencyContact: new FormControl('', [Validators.required]),
      allergyList: new FormControl(''),
      specificCareList: new FormControl(''),
      healthInsurance: new FormControl(''),
      healthInsuranceNumber: new FormControl(''),
      healthInsuranceValidity: new FormControl( null ),
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

  async registerPatient() {
    if (!this.formPatientRegister.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
    } else {
      alert('Dados cadastrado com sucesso!');
    }

    const formatDate = (date: string) => {
      return date.split('-').reverse().join('/');
    };

    const birthdayFormated = formatDate(
      this.formPatientRegister.value.birthday!
    );

    if (this.formPatientRegister.value.healthInsuranceValidity) {
      const healthInsuranceValidityFormated = formatDate(
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
      healthInsuranceValidity: this.formPatientRegister.value.healthInsuranceValidity!,
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

    this.formPatientRegister = this.initPatientForm();
    await this.patientsService.savePatients(patient);
  }
}
