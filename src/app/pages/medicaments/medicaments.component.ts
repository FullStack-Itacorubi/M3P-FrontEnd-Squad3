import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Medicamentsinfos {
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

  formMedicaments: FormGroup<Medicamentsinfos> = new FormGroup({
    medicamentsName: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
    type: new FormControl(''),
    amount: new FormControl(''),
    unit: new FormControl(''),
    observations: new FormControl(''),
    status: new FormControl(''),
  });

  ngOnInit(): void {
    this.initMedicamentsForm();
  }

  initMedicamentsForm() {
    this.formMedicaments = new FormGroup({
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

  registerPatient() {
    if (!this.formMedicaments.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
    } else {
      alert('Dados cadastrados com sucesso!');
    }

    const patient = {
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
