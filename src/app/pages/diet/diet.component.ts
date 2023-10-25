import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DietService } from 'src/app/shared/services/diet.service';
import { PatientsService } from 'src/app/shared/services/patients.service';
import { Diet, Patient } from 'src/app/shared/utils/types';

type Dietinfos = {
  dietName: FormControl<string | null>;
  type: FormControl<string | null>;
  patientId: FormControl<number | null>;
  dietDate: FormControl<string | null>;
  dietTime: FormControl<string | null>;
  status: FormControl<boolean | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css', '../../app.component.css'],
})
export class DietComponent implements OnInit {
  formsDietRegister: FormGroup<Dietinfos>;

  patients: Patient[] = [];

  constructor(private dietService: DietService,
    private patientsService: PatientsService) {
      this.formsDietRegister = this.initDietForm();
    }

  async ngOnInit() {
    this.patients = await this.patientsService.getPatients();
  }

  initDietForm() {
    return new FormGroup({
      dietName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      type: new FormControl('', [Validators.required]),
      patientId: new FormControl( ),
      dietDate: new FormControl('', [Validators.required]),
      dietTime: new FormControl('', [Validators.required]),
      status: new FormControl({ value: true, disabled: true }),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ]),
    });
  }

  registerDiet() {
    if (!this.formsDietRegister.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
    } else {
      alert('Dados cadastrado com sucesso!');
    }

    const diet: Diet = {
      dietName: this.formsDietRegister.value.dietName!,
      type: this.formsDietRegister.value.type!,
      patientId: this.formsDietRegister.value.patientId!,
      dietDate: this.formsDietRegister.value.dietDate!,
      dietTime: this.formsDietRegister.value.dietTime!,
      status: this.formsDietRegister.value.status!,
      description: this.formsDietRegister.value.description!,
    };

    this.formsDietRegister = this.initDietForm();
  }
}
