import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicamentService } from 'src/app/shared/services/medicament.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Patient } from 'src/app/shared/utils/types';

type Medicamentsinfos = {
  medicamentsName: FormControl<string | null>;
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  type: FormControl<string | null>;
  amount: FormControl<string | null>;
  unit: FormControl<string | null>;
  observations: FormControl<string | null>;
  status: FormControl<string | null>;
}

@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.css']
})
export class MedicamentsComponent {

  formMedicaments!: FormGroup<Medicamentsinfos>;

  patients: Patient[] = [];

  constructor(
    private medicamentService: MedicamentService,
    private patientService: PatientService,
  ) {
    this.formMedicaments = this.initMedicamentsForm()
  }

  ngOnInit(): void {
    this.initMedicamentsForm();
  }

  initMedicamentsForm() {
    return new FormGroup<Medicamentsinfos>({
    medicamentsName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      observations: new FormControl('', [
        Validators.required, 
        Validators.minLength(10), 
        Validators.maxLength(1000)
      ]),
      status: new FormControl('', [Validators.required]),
    });
  }

  registerMedicament() {
    if (!this.formMedicaments.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
    } else {
      alert('Dados cadastrados com sucesso!');
    }

    const medicament: Medicament = {
      medicamentsName: this.formMedicaments.value.medicamentsName!,
      date: this.formMedicaments.value.date!,
      time: this.formMedicaments.value.time!,
      type: this.formMedicaments.value.type,
      amount: this.formMedicaments.value.amount!,
      unit: this.formMedicaments.value.unit!,
      observations: this.formMedicaments.value.observations!,
      status: this.formMedicaments.value.status!,
    };

    this.initMedicamentsForm();
  }

  

}
