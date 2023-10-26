import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicamentService } from 'src/app/shared/services/medicament.service';
import { Medicament } from 'src/app/shared/utils/types';

type Medicamentsinfos = {
  medicamentsName: FormControl<string | null>;
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  type: FormControl<string | null>;
  amount: FormControl<number | null>;
  unit: FormControl<string | null>;
  observations: FormControl<string | null>;
  status: FormControl<boolean | null>;
};

@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.css'],
})
export class MedicamentsComponent {
  formMedicaments!: FormGroup<Medicamentsinfos>;

  constructor(private medicamentService: MedicamentService) {
    this.formMedicaments = this.initMedicamentsForm();
  }

  ngOnInit(): void {
    this.initMedicamentsForm();
  }

  initMedicamentsForm() {
    const today = new Date();
    return new FormGroup<Medicamentsinfos>({
      medicamentsName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      date: new FormControl(today.toISOString().substring(0, 10), [
        Validators.required,
      ]),
      time: new FormControl(today.toLocaleTimeString('pt-BR').substring(0, 5), [
        Validators.required,
      ]),
      type: new FormControl('', [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      observations: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ]),
      status: new FormControl({ value: true, disabled: true }, [
        Validators.required,
      ]),
    });
  }

  registerMedicament() {
    if (!this.formMedicaments.valid) {
      alert('Formulário inválido, por favor insira ou corrija seus dados!');
      return;
    } else {
      alert('Dados cadastrados com sucesso!');
    }

    const dateFormated = this.formMedicaments.value
      .date!.split('-')
      .reverse()
      .join('/');

    const medicament: Medicament = {
      name: this.formMedicaments.value.medicamentsName!,
      date: dateFormated!,
      time: this.formMedicaments.value.time! + ':00',
      type: this.formMedicaments.value.type!,
      quantity: this.formMedicaments.value.amount!,
      unit: this.formMedicaments.value.unit!,
      observations: this.formMedicaments.value.observations!,
      status: this.formMedicaments.value.status!,
    };

    this.medicamentService.saveMedicaments(medicament);

    this.initMedicamentsForm();
  }
}
